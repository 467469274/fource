function drawPath(svg){
    return svg
      .append("g")
      .selectAll("path")
      .data(force.links())
      .enter()
      .append("path")
      .attr("class", function (d) {
        return "link";
      })
      .attr({
        id: function (d, i) {
          return "edgepath" + i;
        },
      })
      .style("stroke", function (d) {
        //根据关联关系的不同设置线条颜色
        return "purple";
      })
      .style("stroke-width", 3) //线条粗细
      .attr("marker-end", "url(#resolved)");
   }
function drawText(svg){
    
    var edges_text = svg.append("g")
    .selectAll(".edgelabel")
    .data(force.links())
    .enter()
    .append("text")
    .style({ "pointer-events": "none", "user-select": "none" })
    .attr("class", "linetext")
    .attr({
      class: "edgelabel",
      id: function (d, i) {
        return "edgepath" + i;
      },
      dx: 50,
      dy: 0,
    });
  edges_text
    .append("textPath")
    .attr("xlink:href", function (d, i) {
      return "#edgepath" + i;
    })
    .style("pointer-events", "none")
    .text(function (d) {
      return d.relaname;
    });
    return edges_text;
}