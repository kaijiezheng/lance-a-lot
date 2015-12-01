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
    this.collection.on('sync', this.render, this);

    //initialize SVG graph
    this.chart = d3.select(this.el) /*'#bargraph'*/ 
              .append("svg")
              .attr("class", "chart")
              .attr("width", this.chartOptions.width + this.margin.left + this.margin.right)
              .attr("height", this.chartOptions.height + this.margin.top + this.margin.bottom)
              .append("g")
              .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    this.collection.fetch();
  },

  render: function() {
    var timeData = [];

    //iterate over collection to grab the time (attribute) array on each model
    //the time array holds objects of the start/end times of each timeblock for that particular job
    this.collection.forEach(function(mod) {
      mod.attributes.times.forEach(function(timeblock) {
        var timeObj = {}
        timeObj["total"] = timeblock.total;
        timeObj["date"] = moment(timeblock.start).format("MM-DD-YYYY");
        timeData.push(timeObj);
      });
    });

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

    graphData.sort(function(a, b) {
      return b.date < a.date;
    });

    //Set up scales and axes for graph
    var x = d3.time.scale()
       .domain([new Date(graphData[0].date), d3.time.day.offset(new Date(graphData[graphData.length - 1].date), 1)])
       .rangeRound([0, this.chartOptions.width]);

    var y = d3.scale.linear()
       .domain([0, d3.max(graphData, function(d) { return d.total})])
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
      .attr("x", function(d, i) { return (i * that.chartOptions.width/7) + 15 })
      .attr("y", function(d) { return y(d.total) })
      .attr("width", 85)
      .attr("height", function(d) { return that.chartOptions.height - y(d.total) }) /*total time*/ 
      .attr("fill", "#f6da46");

    this.chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(55," + this.chartOptions.height + ")")
      .call(xAxis);

    this.chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (this.margin.left + 5)+ ", 0)")
      .call(yAxis);

    return this.$el.html;

  }
});
