class Force {
  constructor(info) {
    const { r, x, y } = info;
    this.center = { x, y };
    this.r = r;
    this.minDeg = 15;
    this.dotsLocations = {};
  }
  lines(lines) {
    let linesInfo = [];
    this.dots.forEach((dot) => {
      let relationDots = lines.filter(
        (line) => line.target === dot.id || line.source === dot.id
      );
      let dots = [];
      let reDots = relationDots.reduce((all, now) => {
        const { target, source } = now;
        let pushValue = target === dot.id ? source : target;
        if (all.indexOf(pushValue) < 0) all.push(pushValue);
        return all;
      }, []);
      dot.relationDots = reDots;
    });
    this.dots.sort((a, b) => b.relationDots.length - a.relationDots.length);
    this.initNodes();
  }
  nodes(dots) {
    this.dots = dots;
    this.dotsIds = dots.map((item) => item.id);
  }
  initNodes() {
    const { dotsIds, r, minDeg } = this;
    let outerDeg = 0;
    let outerR = r;
    const { x: centerX, y: centerY } = this.center;
    this.dots.forEach((dot, index) => {
      const { x: outx, y: outy, id } = dot;
      if (!outx && !outy) {
        dot = getLocation(dot)
      }
      const { x: cx, y: cy } = dot;
      dot.relationDots.forEach((relationId) => {
        let relationDot =this.dots.find(d=>d.id === relationId)
        relationDot = getLocation(relationDot)
      });

      // let {x,y} = dot;
      // if(!x&&!y){
      //     let centerDot = this.center;
      //     dot.x = centerDot.x;
      //     dot.y = centerDot.y;
      //     const {r:dotR,minDeg} = this;
      //     operationDot(this.dots,dot.relationDots,centerDot,minDeg,dotR)
      // }
      d3.select("svg")
        .append("g")
        .append("circle")
        .attr("r", 10)
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("fill", "red");
    });
  }
  getLocation(cx,cy,dot){
      const {r} = this;
      let outerDeg= 0;
      let outerR= 0;
    while (
        !this.checkDotLocation(dot) &&
        !dot.x &&
        !dot.y
      ) {
        outerDeg += 15;
        if (outerDeg >= 365) {
          outerDeg = 0;
          outerR += r;
        }
        let innerLocation = getDegXy(cx, cy, outerDeg, outerR);
        dot = Object.assign(dot, innerLocation);
      }
      this.dotsLocations[dot.id] = { x: dot.x, y: dot.y };
      return dot;
  }
  checkDotLocation(nowDot) {
    const { r } = this;
    const { t: st, b: sb, l: sl, r: sr } = getFourDot(nowDot, r); //对比的
    if (!nowDot.x || !nowDot.y) return false;
    let notRepeat = true;
    Object.keys(this.dotsLocations).forEach((key) => {
      const dotl = this.dotsLocations[key];
      const { t: tt, b: tb, l: tl, r: tr } = getFourDot(dotl, r); //被对比的
      if (!((sr < tl || sl > tr) && (st < tb || sb > tt))) {
        notRepeat = false;
      }
    });
    return notRepeat;
  }
}
function getFourDot(nowDot, radius) {
  const { x: tx, y: ty } = nowDot;
  const t = { x: tx, y: ty + radius };
  const b = { x: tx, y: ty - radius };
  const l = { x: tx - radius, y: ty };
  const r = { x: tx + radius, y: ty };
  return {
    t,
    b,
    l,
    r,
  };
}
function operationDot(fullDots, dots, center, deg, r) {
  const { x: cx, y: cy } = center;
  dots.forEach((dotId) => {
    deg += deg;
    console.log(deg);
    const location = getDegXy(cx, cy, deg, r);
    let dot = fullDots.find(({ id }) => id === dotId);
    dot = Object.assign(dot, location);
  });
}
function getDegXy(cx, cy, degree, r) {
  let x = cx + Math.cos(((Math.PI * 2) / 360) * degree) * r;
  let y = cy + Math.sin(((Math.PI * 2) / 360) * degree) * r;
  return {
    x: x,
    y: y,
  };
}
function setLocation(dots, now, location) {
  let { x, y } = location;
  let dot = dots.find((dot) => dot.id === now.id);
  dot.x = x;
  dot.y = y;
}
function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function objLineData(array, key) {
  // let hasO = obj.hasOwnProperty(key);
  let now = array.find((item) => item.id === key);
  if (now) now.numbers += 1;
  else array.push({ id: key, numbers: 1 });
}
