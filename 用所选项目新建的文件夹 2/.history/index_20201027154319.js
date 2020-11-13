function drawAll(force,svg){
    
    const circleInfo = {
        r: 25,
        stroke: 1,
      };
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
          return {path,circle,text,edges_text}
} function setTips(data, text) {
    if (drawFlag) return;
    const { clientX: x, clientY: y } = d3.event;
    let target;
    if (tips[data.name]) {
      target = tips[data.name];
      target.attr("display", "block");
    } else {
      target = svg.append("g");
      target
        .append("rect")
        .attr("width", 100)
        .attr("height", 100)
        .attr("fill", "red")
        .attr("rx", 10)
        .attr("ry", 10);
      target
        .append("text")
        .text(text || data.name)
        .attr("fill", "white")
        .attr("x", 20)
        .attr("y", 20)
        .attr("text-anchor", "start")
        .style("font-size", "20px")
        .style("user-select", "none")
        .style("color", "blue")
        .attr("dy", 8);
      tips[data.name] = target;
    }
    target.select("text").attr("x", x + 20);
    target.select("text").attr("y", y + 20);
    target.select("rect").attr("x", x);
    target.select("rect").attr("y", y);
  }
  function setLinkNumber(group, type) {
    if (group.length == 0) return;
    //对该分组内的关系按照方向进行分类，此处根据连接的实体ASCII值大小分成两部分
    var linksA = [],
      linksB = [];
    for (var i = 0; i < group.length; i++) {
      var link = group[i];
      if (link.source < link.target) {
        linksA.push(link);
      } else {
        linksB.push(link);
      }
    }
    //确定关系最大编号。为了使得连接两个实体的关系曲线呈现对称，根据关系数量奇偶性进行平分。
    //特殊情况：当关系都是连接到同一个实体时，不平分
    var maxLinkNumber = 0;
    if (type == "self") {
      maxLinkNumber = group.length;
    } else {
      maxLinkNumber =
        group.length % 2 == 0 ? group.length / 2 : (group.length + 1) / 2;
    }
    //如果两个方向的关系数量一样多，直接分别设置编号即可
    if (linksA.length == linksB.length) {
      var startLinkNumber = 1;
      for (var i = 0; i < linksA.length; i++) {
        linksA[i].linknum = startLinkNumber++;
      }
      startLinkNumber = 1;
      for (var i = 0; i < linksB.length; i++) {
        linksB[i].linknum = startLinkNumber++;
      }
    } else {
      //当两个方向的关系数量不对等时，先对数量少的那组关系从最大编号值进行逆序编号，然后在对另一组数量多的关系从编号1一直编号到最大编号，再对剩余关系进行负编号
      //如果抛开负号，可以发现，最终所有关系的编号序列一定是对称的（对称是为了保证后续绘图时曲线的弯曲程度也是对称的）
      var biggerLinks, smallerLinks;
      if (linksA.length > linksB.length) {
        biggerLinks = linksA;
        smallerLinks = linksB;
      } else {
        biggerLinks = linksB;
        smallerLinks = linksA;
      }

      var startLinkNumber = maxLinkNumber;
      for (var i = 0; i < smallerLinks.length; i++) {
        smallerLinks[i].linknum = startLinkNumber--;
      }
      var tmpNumber = startLinkNumber;

      startLinkNumber = 1;
      var p = 0;
      while (startLinkNumber <= maxLinkNumber) {
        biggerLinks[p++].linknum = startLinkNumber++;
      }
      //开始负编号
      startLinkNumber = 0 - tmpNumber;
      for (var i = p; i < biggerLinks.length; i++) {
        biggerLinks[i].linknum = startLinkNumber++;
      }
    }
  }
 