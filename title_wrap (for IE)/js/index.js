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
      svg_bg = 62,
      svg_x = 38,
      user_ans = 0,
      width = chart.offsetWidth,
      height = chart.offsetHeight,
      barHeight = (height-axisMargin-margin*3)* 0.8/data.length,
      barPadding = (height-axisMargin-margin*2)*0.6/data.length,
      bar, svg, labelWidth = 0;

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
      if(i == user_ans) d3.select(this).attr("fill","#0A1F33");
      total += +d.vote;
    });
  if(total == 0) document.querySelector('.widget').style.display = 'none';
  bar.append("text")
      .attr("x",0)
      .attr("y",15)
      .attr("dy", ".35em") 
      .attr("class","label")
    .each(function(d,i) {
      if(i == user_ans ) d3.select(this).attr("style","font-weight: bold; font-size: 14px");
      d3.select(this).text(d.ans).call(wrap,svg_x*width/110);
    });
    function wrap(text, width) {
      text.each(function () {
        var text = d3.select(this),
          words = text.text().split("").reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.3, // ems
          x = text.attr("x"),
          y = text.attr("y"),
          dy = 0, //parseFloat(text.attr("dy")),
          tspan = text.text(null)
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(''));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(''));
            line = [word];
            tspan = text.append("tspan")
              .attr("x", x)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
        }
      });
    }

  bar.append("rect")
    .attr("x", svg_x +"%")
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
      if( barWidth > 15){
        d3.select(this).attr("x", + barWidth + svg_x - 2 + "%").attr("dx", 0).attr("style","fill:#fff");
      }else {
        d3.select(this).attr("x", + barWidth + svg_x + "%");
      }
    });