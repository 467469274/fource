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
        this.dots.forEach(dot=>{
            let centerDot = this.center;
            const {r:dotR,minDeg} = this;
            operationDot(dot.relationDots,centerDot,minDeg,dotR)
        })
    }
}
function operationDot(dots,center){
    dots.forEach(dot=>{
        console.log(dot);
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