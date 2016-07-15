var data = [
  {"ans": "A1",
   "vote": 140,
  },{"ans": "A2",
   "vote": 130,
  },{"ans": "A3",
   "vote": 350,
  },{"ans": "A4",
   "vote": 740,
  }
];


var chart = document.getElementById("chart"),
    axisMargin = 20,
    margin = 20,
    valueMargin = 90,
    total = 0,
    width = chart.offsetWidth,
    height = chart.offsetHeight,
    barHeight = (height-axisMargin-margin*2)* 0.4/data.length,
    barPadding = (height-axisMargin-margin*2)*0.6/data.length,
    data, bar, svg, scale, xAxis, labelWidth = 0;

for(var i = 0; i < data.length; i++){
  total += data[i].vote;
}
svg = d3.select(chart)
  .append("svg")
  .attr("width", width)
  .attr("height", height);


bar = svg.selectAll("g")
  .data(data)
  .enter()
  .append("g");

bar.attr("class", "bar")
  .attr("transform", function(d, i) { 
     return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
  });

bar.append("text")
  .attr("class", "label")
  .attr("y", barHeight / 2)
  .attr("dy", ".35em") //vertical align middle
  .text(function(d){
    return d.ans;
  }).each(function() {
    labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width*2));
  });

scale = d3.scale.linear()
  .domain([0, 100])
  .range([0, width - margin*3 - labelWidth]);

xAxis = d3.svg.axis()
  .scale(scale)
  .tickSize(-height + 2*margin + axisMargin)
  .tickFormat(function(d) { return d + "%"; })
  .orient("bottom");

bar.append("rect")
  .attr("transform", "translate("+labelWidth+", 0)")
  .attr("height", barHeight)
  .attr("width", function(d){
    return scale(d.vote/total*100);
  });

bar.append("text")
  .attr("class", "value")
  .attr("y", barHeight / 2)
  .attr("dx", valueMargin + labelWidth) 
  .attr("dy", ".35em") 
  .attr("text-anchor", "end")
  .text(function(d){
    return  d.vote + '件 / ' + Math.round(d.vote*100/total)+'%';
  })
 .attr("x", function(d){
    var width = this.getBBox().width;
    return  scale(d.vote/total*100);
  });

svg.insert("g",":first-child")
 .attr("class", "axis")
 .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
 .call(xAxis);