// Times View --> Connected to Time model

/*
For templates, look at client/views/backbone_templates.
*/
Lancealot.TimesView = Backbone.View.extend({
  id: 'bargraph',
  
  chart: null,

  margin: {
    top: 20, 
    right: 10, 
    bottom: 20, 
    left: 10
  },

  chartOptions: {
    width: 700, //940
    height: 420 //560
  },

  initialize: function() {
    //this.collection.on('change', this.render, this);
   
    //initialize SVG graph
    this.chart = d3.select(this.el) /*'#bargraph'*/ 
              .append("svg")
              .attr("class", "chart")
              .attr("width", this.chartOptions.width + this.margin.left + this.margin.right)
              .attr("height", this.chartOptions.height + this.margin.top + this.margin.bottom)
              .append("g")
              .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    //this.collection.fetch();
    this.render();
  },

  render: function() {
    var timeData = 
    [ {"start":"6:57 AM","end":"4:43 PM","date":"11/7/2015", "total": "1"},
    {"start":"8:05 PM","end":"3:39 PM","date":"11/7/2015", "total": "2.5"},
    {"start":"11:15 AM","end":"3:17 AM","date":"11/7/2015", "total": "6.5"},
    {"start":"7:11 AM","end":"8:45 AM","date":"11/8/2015", "total": "4.5"},
    {"start":"9:05 PM","end":"11:54 AM","date":"11/11/2015", "total": "2.5"},
    {"start":"7:27 PM","end":"7:57 AM","date":"11/9/2015", "total": "1.25"},
    {"start":"7:56 PM","end":"1:35 AM","date":"11/11/2015", "total": "3.05"},
    {"start":"5:59 PM","end":"1:51 AM","date":"11/10/2015", "total": "3.05"},
    {"start":"2:52 AM","end":"7:19 AM","date":"11/11/2015", "total": "3.05"},
    {"start":"4:20 PM","end":"11:22 AM","date":"11/8/2015", "total": "1.25"},
    {"start":"12:15 PM","end":"2:32 PM","date":"11/10/2015", "total": "1.25"},
    {"start":"11:56 AM","end":"7:52 PM","date":"11/11/2015", "total": "4.5"},
    {"start":"12:51 PM","end":"7:35 PM","date":"11/10/2015", "total": "4.5"},
    {"start":"1:47 AM","end":"12:48 PM","date":"11/12/2015", "total": "4.5"},
    {"start":"9:40 PM","end":"4:41 PM","date":"11/9/2015", "total": "4.5"},
    {"start":"10:34 PM","end":"3:01 AM","date":"11/13/2015", "total": "4.5"},
    {"start":"11:28 AM","end":"3:06 PM","date":"11/9/2015", "total": "9.25"},
    {"start":"5:55 AM","end":"7:31 PM","date":"11/12/2015", "total": "4.5"},
    {"start":"11:00 AM","end":"5:06 AM","date":"11/13/2015", "total": "4.5"},
    {"start":"6:32 AM","end":"10:05 AM","date":"11/12/2015", "total": "1.45"},
    {"start":"5:16 AM","end":"2:13 PM","date":"11/12/2015", "total": "4.5"},
    {"start":"6:57 AM","end":"4:43 PM","date":"11/11/2015", "total": "1.45"},
    {"start":"8:05 PM","end":"3:39 PM","date":"11/11/2015", "total": "2.5"},
    {"start":"11:15 AM","end":"3:17 AM","date":"11/13/2015", "total": "4.5"}];
  //filter by day and add total time per day
    //create hash to store date as key and tally the totals
    var totalsByDay = {};

    for(var i = 0; i < timeData.length; i++) {
        if(!totalsByDay[timeData[i].date]) {
            totalsByDay[timeData[i].date] = +timeData[i].total;
        } else {
            totalsByDay[timeData[i].date] += +timeData[i].total
        }
    }

    //convert back to object with date and total properties
    var graphData = [];

    for(var key in totalsByDay) {
        graphData.push({date: key, total: totalsByDay[key]})
    }

    //Set up scales and axes for graph
    var x = d3.time.scale()
       .domain([new Date(graphData[0].date), d3.time.day.offset(new Date(graphData[graphData.length - 1].date), 1)])
       .rangeRound([0, this.chartOptions.width]);

    var y = d3.scale.linear()
       .domain([0,24])
       .range([this.chartOptions.height, 0]);

    var xAxis = d3.svg.axis()
       .scale(x)
       .orient("bottom")
       .ticks(d3.time.days, 1)
       .tickFormat(d3.time.format('%a %b %d'))
       .tickPadding(4);

    var yAxis = d3.svg.axis()
       .scale(y)
       .orient("left")
       .ticks(10)
       .tickPadding(8);
    
    //render time data onto graph
    var that = this;
    this.chart.selectAll('rect')
      .data(graphData/* this.collection? */)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d, i) { return (i * 100) + 15 })
      .attr("y", function(d) { return y(d.total) })
      .attr("width", 85)
      .attr("height", function(d) { return that.chartOptions.height - y(d.total) }) /*total time*/ 
      .attr("fill", "teal");

    this.chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(55," + this.chartOptions.height + ")")
      .call(xAxis);

    this.chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (this.margin.left + 5)+ ", 0)")
      .call(yAxis);
    
    // d3.select("svg").selectAll("text")
    //          .data(graphData)
    //          .enter()
    //          .append("text")
    //          .text(function(d) {
    //             return d.total;
    //          })
    //          .attr("x", function(d, i) {
    //             return i * (that.chartOptions.width / graphData.length) + 5;
    //          })
    //          .attr("y", function(d) {
    //             return that.chartOptions.height - (d.total * 4) + 15;
    //          })
    //          .attr("font-family", "sans-serif")
    //          .attr("font-size", "11px")
    //          .attr("fill", "black");

    return this.$el.html;

  }
});
