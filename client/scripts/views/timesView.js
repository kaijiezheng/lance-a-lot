// Times View --> Connected to Time model

/*
For templates, look at client/views/backbone_templates.
*/
Lancealot.TimesView = Backbone.View.extend({
  //template: Templates['timeGraph'],
  el: '#bargraph',
  chart: null,
  chartOptions: {
    width: 900,
    height: 450,
    margin: 50
  },
  initialize: function() {
    console.log('inside initialize')
    //this.collection.on('change', this.render, this);
    
    //initialize SVG graph
    this.chart = d3.select(this.el)
              .append("svg")
              .attr("class", "chart")
              .attr("width", this.chartOptions.width)
              .attr("height", this.chartOptions.height)
              .append("g")
              .attr("transform", "translate(0, 0)");
              //render?
    //this.collection.fetch();
    this.render();
  },
  render: function() {
    console.log('inside time render')
    var timeData = 
    [{"start":"7:11 AM","end":"8:45 AM","date":"11/8/2015", "total": "45"},
    {"start":"9:05 PM","end":"11:54 AM","date":"11/11/2015", "total": "25"},
    {"start":"7:27 PM","end":"7:57 AM","date":"11/9/2015", "total": "125"},
    {"start":"7:56 PM","end":"1:35 AM","date":"11/11/2015", "total": "305"},
    {"start":"5:59 PM","end":"1:51 AM","date":"11/10/2015", "total": "305"},
    {"start":"2:52 AM","end":"7:19 AM","date":"11/11/2015", "total": "305"},
    {"start":"4:20 PM","end":"11:22 AM","date":"11/8/2015", "total": "125"},
    {"start":"12:15 PM","end":"2:32 PM","date":"11/10/2015", "total": "125"},
    {"start":"11:56 AM","end":"7:52 PM","date":"11/11/2015", "total": "45"},
    {"start":"12:51 PM","end":"7:35 PM","date":"11/10/2015", "total": "45"},
    {"start":"1:47 AM","end":"12:48 PM","date":"11/12/2015", "total": "45"},
    {"start":"9:40 PM","end":"4:41 PM","date":"11/9/2015", "total": "45"},
    {"start":"10:34 PM","end":"3:01 AM","date":"11/13/2015", "total": "45"},
    {"start":"11:28 AM","end":"3:06 PM","date":"11/9/2015", "total": "125"},
    {"start":"5:55 AM","end":"7:31 PM","date":"11/12/2015", "total": "45"},
    {"start":"11:00 AM","end":"5:06 AM","date":"11/13/2015", "total": "45"},
    {"start":"6:32 AM","end":"10:05 AM","date":"11/12/2015", "total": "145"},
    {"start":"5:16 AM","end":"2:13 PM","date":"11/12/2015", "total": "45"},
    {"start":"6:57 AM","end":"4:43 PM","date":"11/11/2015", "total": "145"},
    {"start":"8:05 PM","end":"3:39 PM","date":"11/11/2015", "total": "25"},
    {"start":"11:15 AM","end":"3:17 AM","date":"11/13/2015", "total": "45"}];
//filter by day and add total time per day
     // var x = d3.scale.ordinal()
     //     .domain(d3.range([7]) 7? )
     //     .rangeRoundBands([0, this.chartOptions.width], .5);
     var x = d3.time.scale()
         .domain([new Date(timeData[0].date), d3.time.day.offset(new Date(timeData[timeData.length - 1].date), 1)])
         .rangeRound([0, this.chartOptions.width - this.chartOptions.margin * 2]);

     var y = d3.scale.linear()  
             .domain([0, 400])
             .range([this.chartOptions.height, 0]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        //.call(x);

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");  

    var that = this;
    //render time data onto graph
    this.chart.selectAll('rect')
      .data(timeData/* this.collection? */)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d, i) { return i * 80 })
      .attr("y", function(d) { return y(d.total) })
      .attr("width", /*x.rangeBand()*/(this.chartOptions.width / 7) - 70)
      .attr("height", /*total time*/ function(d) { return that.chartOptions.height - y(d.total) })
      .attr("fill", "teal")

    //this.$el.html(this.template())
    this.$el.html;
    return this;
  }
});
