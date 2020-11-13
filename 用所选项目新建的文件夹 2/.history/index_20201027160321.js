//箭头
var marker = svg
.append("marker")
.attr("id", function (d) {
  return d;
})
.attr("id", "resolved")
.attr("markerUnits", "strokeWidth") //设置为strokeWidth箭头会随着线的粗细发生变化
.attr("markerUnits", "userSpaceOnUse")
.attr("viewBox", "0 -5 10 10") //坐标系的区域
.attr("refX", 32) //箭头坐标
.attr("refY", -1)
.attr("markerWidth", 12) //标识的大小
.attr("markerHeight", 12)
.attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
.attr("stroke-width", 2) //箭头宽度
.append("path")
.attr("d", "M0,-5L10,0L0,5") //箭头的路径
.attr("fill", "#6c6c6c"); //箭头颜色
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
