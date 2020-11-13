class Force{
    constructor(center){
        this.center = center;
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
            console.log(dot);
        })
    }
}
function operationDot(dots){
    dots.forEach(dot=>{
        console.log(dot);
    })
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