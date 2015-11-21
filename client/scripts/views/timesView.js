// Times View --> Connected to Time model

/*
For templates, look at client/views/backbone_templates.
*/
Lancealot.TimesView = Backbone.View.extend({
  chart: null,
  chartOptions: {
    width: 400,
    height: 450
  },
  initialize: function() {
    this.collection.on('change', this.render, this);
    
    //initialize SVG graph
    chart = d3.selectAll($(this.el))
              .append("svg")
              .attr("class", "chart")
              .attr("width", this.chartOptions.width)
              .attr("height", this.chartOptions.height)
              .append("g")
              .attr("transform", "translate(10,15)");
              //render?
    this.collection.fetch();
  },
  render: function() {
    var x = d3.scale.ordinal()
        .domain(/* 7? */)
        .rangeRoundBands([0, this.chartOptions.width], .1);

    var y = d3.scale.linear()  
            .domain([0, 7])
            .range([0, this.chartOptions.height]);
    //render time data onto graph
    this.chart.selectAll('rect')
      .data("../../../seeds/times.json"/* this.collection? */)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", )
      .attr("y", function(d, i) { return i * 20 })
      .attr("width", (this.chartOptions.width / 7) - 1)
      .attr("height", 150 /*total time function(d) { return d.total }*/)
      .attr("fill", "teal")

  }
});
