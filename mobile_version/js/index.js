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
      user_ans = 0,
      barHeight = 80,
      barPadding = 5,
      width = chart.offsetWidth,
      height =(barHeight + barPadding)*data.length,
      bar, svg, labelWidth = 0;

  svg = d3.select(chart)
    .append("svg")
    .attr("width", width)
    .attr("height", height);
    
  bar = svg.selectAll("g")
    .data(data)
    .enter()
    .append("g");

  bar.attr("class", "bar")
    .attr("fill","#9DA5AD")
    .attr("transform", function(d, i) { 
       return "translate( 0 ," + (i * (barHeight + barPadding)) + ")";
    }).each(function(d,i){
      if(i == user_ans) d3.select(this).attr("fill","#0A1F33");
      total += +d.vote;
    });
  bar.append("text")
      .attr("x",0)
      .attr("y",15)
      .attr("dy", ".5em") 
      .attr("class","label")
    .each(function(d,i) {
      if(i == user_ans ) d3.select(this).attr("style","font-weight: bold; font-size: 14px");
      d3.select(this).text(d.ans);
    });

  bar.append("rect")
    .attr("x", 0)
    .attr("y", 33)
    .attr("height", barHeight/2)
    .attr("width", function(d){
      return d.vote/total*width;
    });

  bar.append("text")
    .attr("class", "value")
    .attr("y", barHeight / 2)
    .attr("dx", 55)
    .attr("dy", "1.4em")
    .attr("text-anchor", "end")
    .text(function(d){
      return  d.vote + '件 / ' + Math.round(d.vote*100/total)+'%';
    })
    .each(function(d){
      var barWidth = d3.select(this.previousSibling).attr("width").replace(/%/g, "");
      if( barWidth > 75){
        d3.select(this).attr("x", + barWidth - 10 ).attr("dx", 0).attr("style","fill:#fff");
      }else {
        d3.select(this).attr("x", + barWidth + 10);
      }
    });

    bar.append("line")
    .style("stroke", "#ccc")
    .attr("x1", 0)
    .attr("y1", (barHeight + barPadding))
    .attr("x2", width)
    .attr("y2", (barHeight + barPadding));
    