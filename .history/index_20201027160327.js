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
