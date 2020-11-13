
function drawCircleText(){
    return svg
          .append("g")
          .selectAll("text")
          .data(force.nodes())
          //返回缺失元素的占位对象（placeholder），指向绑定的数据中比选定元素集多出的一部分元素。
          .enter()
          .append("text")
          .attr("dy", ".35em")
          .attr("text-anchor", "middle") //在圆圈中加上数据
          .style({
            fill: function (node) {
              return "#A254A2";
            },
            "user-select": "none",
          })
          .attr("x", function (d) {
            // console.log(d.name+"---"+ d.name.length);
            var re_en = /[a-zA-Z]+/g;
            //如果是全英文，不换行
            if (d.names.match(re_en)) {
              d3.select(this)
                .append("tspan")
                .attr("x", 0)
                .attr("y", 2)
                .text(function () {
                  return d.names;
                });
            }
            //如果小于四个字符，不换行
            else if (d.names.length <= 4) {
              d3.select(this)
                .append("tspan")
                .attr("x", 0)
                .attr("y", 2)
                .text(function () {
                  return d.names;
                });
            } else {
              var top = d.names.substring(0, 4);
              var bot = d.names.substring(4, d.names.length);

              d3.select(this).text(function () {
                return "";
              });

              d3.select(this)
                .append("tspan")
                .attr("x", 0)
                .attr("y", -7)
                .text(function () {
                  return top;
                });

              d3.select(this)
                .append("tspan")
                .attr("x", 0)
                .attr("y", 10)
                .text(function () {
                  return bot;
                });
            }
            //直接显示文字
            /*.text(function(d) { 
        return d.name; */
          });
}
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
function drawCircle(svg){
    var circle = svg.append("g")
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
          return circle;
}

function inSquare(d, endLoc) {
    var leftTop = []; // LT 为框选左上角 x,y
    var rightBottom = []; // LT 为框选左上角 x,y
    if (endLoc[0] >= startLoc[0]) {
      leftTop[0] = startLoc[0];
      rightBottom[0] = endLoc[0];
    } else {
      leftTop[0] = endLoc[0];
      rightBottom[0] = startLoc[0];
    }

    if (endLoc[1] >= startLoc[1]) {
      leftTop[1] = startLoc[1];
      rightBottom[1] = endLoc[1];
    } else {
      leftTop[1] = endLoc[1];
      rightBottom[1] = startLoc[1];
    }
    return (
      d.x < rightBottom[0] &&
      d.x > leftTop[0] &&
      d.y > leftTop[1] &&
      d.y < rightBottom[1]
    );
  }
  
        //设置圆圈和文字的坐标
        function transform1(d) {
            return "translate(" + d.x + "," + d.y + ")";
          }
          function transform2(d) {
            return "translate(" + d.x + "," + d.y + ")";
          }