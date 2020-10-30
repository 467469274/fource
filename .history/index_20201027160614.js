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
drawCircle(svg){
    svg.append("g")
          .selectAll("circle")
          .data(force.nodes()) //表示使用force.nodes数据
          .enter()
          .append("circle")
          .style("stroke-width", function (data) {
            return circleInfo.stroke;
          })
          .attr("class", "regionNode")
          .style("fill", function (node) {
            //圆圈背景色
            //根据客户不同定义圆圈颜色
            return "blue";
          })
          .style("stroke", function (node) {
            //圆圈线条的颜色
            return "orange";
          })
          .call(force.drag) //将当前选中的元素传到drag函数中，使顶点可以被拖动
          .attr("r", circleInfo.r) //设置圆圈半径
}