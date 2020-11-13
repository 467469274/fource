function drawAll(force){
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
    var path = svg
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
          .on("mousemove", function (e) {
            setTips(e, `${e.sourcename}=>${e.targetname}`);
          })
          .on("mouseout", function (e) {
            initTips(e);
          })
          .style("stroke-width", 3) //线条粗细
          .attr("marker-end", "url(#resolved)");

        //设置直线上的字
        var edges_text = svg
          .append("g")
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

        //圆圈
        var circle = svg
          .append("g")
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
          .attr("r", circleInfo.r) //设置圆圈半径
          .on("dblclick", function (node) {
            // alert("names:"+node.names+" , name:"+node.name);
            console.log(123);
          })

          //给圆圈添加单机事件
          .on("click", function (node) {
            //单击时圆圈上的字
            text.style("fill", function (data) {
              return "#fff";
            });
            //单击时圆圈边线宽度
            circle.style("stroke-width", function (data) {
              return 10;
            });
            //单击时圆圈背景色
            circle.style("fill", function (data) {
              var color = "#FFFAF0"; //圆圈背景色
            });
            //单击时圆圈边缘线颜色
            circle.style("stroke", function (data) {
              return "red";
            });
            //单击时让连接线加粗
            path.style("stroke-width", function (line) {
              return 5;
            });
            path.style("stroke", function (line) {
              return "red";
            });
            //单击时让连接线文字
            edges_text.style("fill", function (line) {
              return "#000000";
            });
          })
          .on("mousemove", function (e) {
            setTips(e);
          })
          .on("mouseout", function (e) {
            initTips(e);
          })
          .call(force.drag); //将当前选中的元素传到drag函数中，使顶点可以被拖动

        //圆圈的提示文字
        circle.append("svg:title").text(function (node) {
          return "双击可查看详情";
        });

        //圆圈上的字
        var text = svg
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