class Force{
    constructor(info){
        const {r,x,y} = info;
        this.center ={x,y} ;
        this.r = r;
        this.minDeg = 15;
    }
    lines(lines){
        let linesInfo =[];
        this.dots.forEach((dot)=>{
            let relationDots = lines
            .filter(line=>line.target === dot.id || line.source === dot.id);
            let dots = [];
            let reDots = relationDots.reduce((all, now)=>{
                const {target,source}  = now;
                let pushValue = target === dot.id?source:target;
                if(all.indexOf(pushValue)<0)all.push(pushValue);
                return all;
            },[]);
            dot.relationDots = reDots
        })
        this.dots.sort((a,b)=>b.relationDots.length-a.relationDots.length)
        this.initNodes();
    }
    nodes(dots){
        this.dots = dots;
        this.dotsIds = dots.map(item=>item.id);
    }
    initNodes(){
        const {dotsIds} = this;
        this.dots.forEach((dot,index)=>{
            if(index === 0)dot = Object(this.center,dot);
            // let {x,y} = dot;
            // if(!x&&!y){
            //     let centerDot = this.center;
            //     dot.x = centerDot.x;
            //     dot.y = centerDot.y;
            //     const {r:dotR,minDeg} = this;
            //     operationDot(this.dots,dot.relationDots,centerDot,minDeg,dotR)
            // }
        })
    }
    checkDotLocation(nowDot){
        const {r} = this;
        const {x:tx,y:ty} = nowDot;
        const notRepeat = true;
        const t = {x:tx,y:ty + r};
        const b = {x:tx,y:ty - r};
        const l = {x:tx-r,y:ty};
        const r = {x:tx+r,y:ty};
        this.dotsLocations.forEach((dotl)=>{
            const {x,y} = dotl;
            if()
        })
    }
}
function operationDot(fullDots,dots,center,deg,r){
    const {x:cx,y:cy} = center;
    dots.forEach(dotId=>{
        deg+=deg;
        console.log(deg)
        const location = getLocation(cx,cy,deg,r);
        let dot = fullDots.find(({id})=>id === dotId);
        dot = Object.assign(dot,location);
    })
}
function getLocation(cx,cy,degree,r){
    let x = cx +  Math.cos(Math.PI * 2 / 360 * degree) * r;
    let y = cy+ Math.sin(Math.PI * 2 / 360 * degree) * r;
    return {
        x:x,
        y:y
    };
}
function setLocation(dots,now,location){
    let {x,y} = location;
    let dot = dots.find(dot=>dot.id === now.id)
    dot.x = x;
    dot.y = y;
}
function copy(obj){
    return JSON.parse(JSON.stringify(obj))
}
function objLineData(array,key){
    // let hasO = obj.hasOwnProperty(key);
    let now = array.find(item=>item.id === key)
    if(now)now.numbers +=1;
    else array.push({id:key,numbers:1})
}