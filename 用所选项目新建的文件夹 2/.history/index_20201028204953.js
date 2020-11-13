function drawCircleText() {
  return (
    svg
      .append("g")
      .selectAll("text")
      .data(force.nodes())
      //返回缺失元素的占位对象（placeholder），指向绑定的数据中比选定元素集多出的一部分元素。
      .enter()
      .append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle") //在圆圈中加上数据
      .attr("fill", "#A254A2") //在圆圈中加上数据
      .attr("user-select", "#none") //在圆圈中加上数据
      .attr("x", function (d) {
        d3.select(this)
          .append("tspan")
          .attr("x", 0)
          .attr("y", 10)
          .text(function () {
            return "fuckoff";
          });
      })
  );
}
function drawPath(svg, type) {
  return svg
    .append("g")
    .attr('class',`${type==='thumb'?'thumbG':''}`)
    .selectAll("path")
    .data(links)
    .enter()
    .append("path")
    .attr("class", function (d) {
      return `link regionNode`;
    })
    .attr("id", function (d, i) {
      return "edgepath" + i;
    })
    .attr("stroke", function (d) {
      //根据关联关系的不同设置线条颜色
      return "purple";
    })
    .attr("stroke-width", type === "thumb" ? 3 / 5 : 3) //线条粗细
    .attr("marker-end", type === "thumb" ? "" : "url(#resolved)");
}
function drawText(svg) {
  var edges_text = svg
    .append("g")
    .selectAll(".edgelabel")
    .data(links)
    .enter()
    .append("text")
    .attr("pointer-events", "none")
    .attr("user-select", "none")
    .attr("class", "linetext edgelabel")
    .attr("id", function (d, i) {
      return "edgepath" + i;
    })
    .attr("dx", 50)
    .attr("dy", 0)
    .append("textPath")
    .attr("xlink:href", function (d, i) {
      return "#edgepath" + i;
    })
    .style("pointer-events", "none")
    .text(function (d) {
      return circleInfo.relaname;
    });
  return edges_text;
}
function drawCircle(svg, type) {
  const r = type === "thumb" ? circleInfo.r / 5 : circleInfo.r;
  var circle = svg
    .append("g")
    .selectAll("circle")
    .data(ars) //表示使用force.nodes数据
    .enter()
    .append("circle")
    .attr("stroke-width", function (data) {
      return 1;
    })
    .attr("class", "regionNode")
    .attr("fill", function (node) {
      //圆圈背景色
      //根据客户不同定义圆圈颜色
      return "blue";
    })
    .attr("stroke", function (node) {
      //圆圈线条的颜色
      return "orange";
    })
    .call(d3.drag().on("start", started).on("drag", dragged).on("end", ended))
    .attr("r", r); //设置圆圈半径
  return circle;
}
function started(d) {
  if (!d3.event.active) {
    force.alphaTarget(0.2).restart(); //设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
  }
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(d) {
  const { x, y } = d3.event;
  if (inBoundaries(x, y).isIn) {
    d.fx = x;
    d.fy = y;
  }
  // d.fx = d3.event.x;
  // d.fy = d3.event.y;
}
function ended(d) {
  force.force("y", d3.forceY().strength(0));
  force.force("x", d3.forceX().strength(0));
  if (!d3.event.active) {
    force.alphaTarget(0);
  }
  d.fx = null;
  d.fy = null;
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
  const {x,y} = d;
  // d.fx = x;
  // d.fy = y;
  return "translate(" + d.x + "," + d.y + ")";
}
function transform2(d) {
  return "translate(" + d.x + "," + d.y + ")";
}
function mNumber(n, type) {
  return type === "thumb" ? n / 5 : n;
}
function pathD(d, type) {
  var { x: sx, y: sy } = d.source;
  var { x: tx, y: ty } = d.target;
  sx = mNumber(sx, type);
  sy = mNumber(sy, type);
  tx = mNumber(tx, type);
  ty = mNumber(ty, type);
  //如果连接线连接的是同一个实体，则对path属性进行调整，绘制的圆弧属于长圆弧，同时对终点坐标进行微调，避免因坐标一致导致弧无法绘制
  if (d.target == d.source) {
    dr = mNumber(30 / d.linknum, type);
    return (
      "M" +
      sx +
      "," +
      sy +
      "A" +
      dr +
      "," +
      dr +
      ` 0 ${mNumber(1, type)},${mNumber(1, type)} ` +
      tx +
      "," +
      (ty + mNumber(1, type))
    );
  } else if (d.size % 2 != 0 && d.linknum == 1) {
    //如果两个节点之间的连接线数量为奇数条，则设置编号为1的连接线为直线，其他连接线会均分在两边
    return "M " + sx + "," + sy + ",L " + tx + "," + ty;
  }
  //根据连接线编号值来动态确定该条椭圆弧线的长半轴和短半轴，当两者一致时绘制的是圆弧
  //注意A属性后面的参数，前两个为长半轴和短半轴，第三个默认为0，第四个表示弧度大于180度则为1，小于则为0，这在绘制连接到相同节点的连接线时用到；第五个参数，0表示正角，1表示负角，即用来控制弧形凹凸的方向。本文正是结合编号的正负情况来控制该条连接线的凹凸方向，从而达到连接线对称的效果
  var curve = 1.2;
  var homogeneous = 1.2;
  var dx = d.target.x - d.source.x,
    dy = d.target.y - d.source.y,
    dr =
      (Math.sqrt(dx * dx + dy * dy) * (d.linknum + homogeneous)) /
      (curve * homogeneous);
  dr = mNumber(dr, type);
  //当节点编号为负数时，对弧形进行反向凹凸，达到对称效果
  if (d.linknum < 0) {
    dr =
      (Math.sqrt(dx * dx + dy * dy) * (-1 * d.linknum + homogeneous)) /
      (curve * homogeneous);
    dr = mNumber(dr, type);

    return (
      "M" + sx + "," + sy + "A" + dr + "," + dr + " 0 0,0 " + tx + "," + ty
    );
  }
  return "M" + sx + "," + sy + "A" + dr + "," + dr + " 0 0,1 " + tx + "," + ty;
}
function drawThumb() {
  //每次绘制前删除之前的图形（这是一种简单有效的动画理论，但是比较消耗资源，之后会介绍如何节省资源完成需求）
  d3.select("#thumbSvg").remove();
  let w,h,x = 0,y = 0;
  dragThumb =  d3
  .select("#dragMap")
  .append("svg")
  .attr("width", 100)
  .attr("height", 100)
  .attr("id", "dragThumb")
  thumbSvg = d3
    .select("#thumbMap")
    .append("svg")
    .attr("width", 100)
    .attr("height", 100)
    .attr("id", "thumbSvg")
    .attr("viewBox",function(){
        // w = width/5;
        // h = height/5;
      if(!nodeRangInfo){
        w = width/5;
        h = height/5;
      }else{
        let {left,right,top,bottom} = nodeRangInfo;
        w = (Math.abs(left)+Math.abs(right))/5;
        h =(Math.abs(top)+Math.abs(bottom))/5;
        let floatX = left/5;
        let floatT = top/5;
        x = floatX<0?floatX:0;
        y = floatT<0?floatT:0;
        // console.log
      }
      return `${x} ${y} ${w} ${h}`
    });
  let thumbPath = drawPath(thumbSvg, "thumb");
  thumbPath.attr("d", (d) => {
    return pathD(d, "thumb");
  });
  thumbSvg
    .append("g")
    .attr("class",'thumbG')
    .selectAll("circle")
    .data(ars)
    .enter()
    .append("circle")
    .attr("class", "tnode")
    .attr("r", 5) //图形尺寸都要缩小
    .attr("fill", "red")
    .attr("cx", function (d) {
      return d.x / 5;
    })
    .attr("cy", function (d) {
      return d.y / 5;
    });
}
function getMaxNumber(){
  let [top, bottom, left, right] = [1e9, -1e9, 1e9, -1e9];
  ars.forEach(node => {
    // console.log(node)
    if (left > initialBBox(node).left) {
      left = initialBBox(node).left
    }
    if (right < initialBBox(node).right) {
      right = initialBBox(node).right
    }
    if (top > initialBBox(node).top) {
      top = initialBBox(node).top
    }
    if (bottom < initialBBox(node).bottom) {
      bottom = initialBBox(node).bottom
    }
  });
  nodeRangInfo = {
    top, bottom, left, right
  }
  // ars
}
// 得到 circle 的四条边
function initialBBox (d) {
  return {
    left : d.x - circleInfo.r,
    right : d.x + circleInfo.r,
    top : d.y - circleInfo.r,
    bottom : d.y + circleInfo.r
  }
}
function inBoundaries(x, y) {
  const r = 25
  const { k, x: tx, y: ty } =zoomTransform|| { k: 1, x: 0, y: 0 }; //缩略
  const newX = (x + 20) * k + tx;
  const newY = (y + 20) * k + ty;
  // 圆点大于左上角 最起码要有一个能 放下 圆形的空间
  // 圆点小于 右边
  let leftX = newX >= r * k,
  rightX = newX <= width - r * k,
  topY = newY >= r * k,
  bottomY = newY <= height - r * k;
  return {
    isIn:leftX&&rightX&&topY&&bottomY,
    leftX,rightX,topY,bottomY
  }
}
function setZoom(){
  return "translate(" +
  d3.event.transform.x +
  "," +
  d3.event.transform.y +
  ") scale(" +
  d3.event.transform.k +
  ")"
}