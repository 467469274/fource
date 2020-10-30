
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
function drawPath(svg,type){
    return svg
      .append("g")
      .selectAll("path")
      .data(force.links())
      .enter()
      .append("path")
      .attr("class", function (d) {
        // return type==='thumb'?"":'link';
        return 'link'
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
function drawCircle(svg,type){
    const r = type === 'thumb'?circleInfo.r/5 :circleInfo.r;
    console.log(r)
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
          .attr("r", r) //设置圆圈半径
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
          function mNumber(n,type){
              return type === 'thumb'?n/5:n;
          }
          function pathD(d,type){
            var {x:sx,y:sy} = d.source
            var {x:tx,y:ty} = d.target
            sx = mNumber(sx,type)
            sy = mNumber(sy,type)
            tx = mNumber(tx,type)
            ty = mNumber(ty,type)
              //如果连接线连接的是同一个实体，则对path属性进行调整，绘制的圆弧属于长圆弧，同时对终点坐标进行微调，避免因坐标一致导致弧无法绘制
              if (d.target == d.source) {
                dr = mNumber(30 / d.linknum,type);
                return (
                  "M" +
                  sx +
                  "," +
                  sy +
                  "A" +
                  dr +
                  "," +
                  dr +
                  ` 0 ${mNumber(1,type)},${mNumber(1,type)} ` +
                  tx +
                  "," +
                  (ty + mNumber(1,type))
                );
              } else if (d.size % 2 != 0 && d.linknum == 1) {
                //如果两个节点之间的连接线数量为奇数条，则设置编号为1的连接线为直线，其他连接线会均分在两边
                return (
                  "M " +
                  sx +
                  "," +
                  sy +
                  ",L " +
                  tx +
                  "," +
                  ty
                );
              }
              //根据连接线编号值来动态确定该条椭圆弧线的长半轴和短半轴，当两者一致时绘制的是圆弧
              //注意A属性后面的参数，前两个为长半轴和短半轴，第三个默认为0，第四个表示弧度大于180度则为1，小于则为0，这在绘制连接到相同节点的连接线时用到；第五个参数，0表示正角，1表示负角，即用来控制弧形凹凸的方向。本文正是结合编号的正负情况来控制该条连接线的凹凸方向，从而达到连接线对称的效果
              var curve = 1.2;
              var homogeneous =  mNumber(1.2,type);
              var dx = tx - sx,
                dy = ty - sy,
                dr =
                  (Math.sqrt(dx * dx + dy * dy) * (d.linknum + homogeneous)) /
                  (curve * homogeneous);
                  console.log(dx,dy)
              //当节点编号为负数时，对弧形进行反向凹凸，达到对称效果
              if (d.linknum < 0) {
                dr =
                  (Math.sqrt(dx * dx + dy * dy) *
                    (mNumber(-1,type) * d.linknum + homogeneous)) /
                  (curve * homogeneous);
                  console.log(type ==='thumb'?`thumb:${dr}`:`normal${dr}`)
                return (
                  "M" +
                  sx +
                  "," +
                  sy +
                  "A" +
                  dr +
                  "," +
                  dr +
                  " 0 0,0 " +
                  tx +
                  "," +
                  ty
                );
              }
              return (
                "M" +
                sx +
                "," +
                sy +
                "A" +
                dr +
                "," +
                dr +
                `,0 0,1 ` +
                tx +
                "," +
                ty
              );
          }