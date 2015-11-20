// Times View --> Connected to Time model

/*
For templates, look at client/views/backbone_templates.
*/
Lancealot.TimesView = Backbone.View.extend({
  chart: null,
  chartOptions: {
    width: 400,
    height: 450
  }
  initialize: function() {
    this.collection.on('change', this.render, this);
    
    //initialize graph
    chart = d3.selectAll($(this.el))
              .append("svg")
              .attr("class", "chart")
              .attr("width", this.chartOptions.width)
              .attr("height", this.chartOptions.height)
              .append("g")
              .attr("transform", "translate(10,15)");

    this.collection.fetch();
  },
  render: function() {
    //render time data onto graph
    this.chart.selectAll('rect')
      .data('../../../seeds/times.json'/* this.collection? */)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', )
      .attr('y', )
      .attr('width', (this.chartOptions.width / 7) - 1)
      .attr('height', 150 /*total time*/)
      .attr('fill', 'teal')

  }
});
