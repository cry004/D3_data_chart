var data = [
  {"ans": "テキストテキストてき",
   "vote": 100,
  },{"ans": "テキストテキストてきテキストテキストてきテキストテキストてき",
   "vote": 10,
  },{"ans": "テキストテキストてき",
   "vote": 10,
  },{"ans": "テキストテキストてきテキストテキストてきテキストテキストてき",
   "vote": 10,
  }
];


var chart = document.getElementById("chart"),
    axisMargin = 40,
    margin = 20,
    total = 0,
    svg_bg = 58,
    svg_x = 42,
    width = chart.offsetWidth,
    height = chart.offsetHeight,
    barHeight = (height-axisMargin-margin*3)* 0.8/data.length,
    barPadding = (height-axisMargin-margin*2)*0.6/data.length,
    data, bar, svg, labelWidth = 0;

svg = d3.select(chart)
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svg.append("rect")
  .attr("class","svg_bg")
  .attr("x", svg_x + "%")
  .attr("width", svg_bg + "%")
  .attr("height", 100 + "%");
  
bar = svg.selectAll("g")
  .data(data)
  .enter()
  .append("g");

bar.attr("class", "bar")
  .attr("fill","#9DA5AD")
  .attr("transform", function(d, i) { 
     return "translate( 0 ," + (i * (barHeight + barPadding) + barPadding) + ")";
  }).each(function(d,i){
    if(i == 0) d3.select(this).attr("fill","#0A1F33");
    total += d.vote;
  });
  
bar.append("foreignObject")
    .attr("width", "40"+"%")
    .attr("height", barHeight)
    .attr("top", barHeight / 2)
    .attr("line-height", ".35em") //vertical align middle
    .append("xhtml:div")
    .attr("class","label")
    .append("xhtml:div")
  .each(function(d,i) {
    if(i == 0) d3.select(this).attr("style","font-weight: bold; font-size: 14px");
    d3.select(this).html(d.ans);
  });

bar.append("rect")
  .attr("x", "42%")
  .attr("height", barHeight)
  .attr("width", function(d){
    return d.vote/total*svg_bg + "%";
  })

bar.append("text")
  .attr("class", "value")
  .attr("y", barHeight / 2)
  .attr("dx", 55)
  .attr("dy", ".35em")
  .attr("text-anchor", "end")
  .text(function(d){
    return  d.vote + '件 / ' + Math.round(d.vote*100/total)+'%';
  })
  .each(function(d){
    var barWidth = d3.select(this.previousSibling).attr("width").replace(/%/g, "");
    if( barWidth > 5){
      d3.select(this).attr("x", + barWidth + svg_x - 2 + "%").attr("dx", 0).attr("style","fill:#fff");
    }else {
      d3.select(this).attr("x", + barWidth + svg_x + "%");
    }
  });