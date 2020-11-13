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
                console.log(target)
                let pushValue = target === dot.id?target:source;
                
                all.push(pushValue);
                return all;
            },[]);
            console.log(relationDots)
        })
        this.initNodes();
    }
    nodes(dots){
        this.dots = dots;
        this.dotsIds = dots.map(item=>item.id);
    }
    initNodes(){
        let dotIds = copy(this.dotsIds);
        console.log(dotIds)
        let dotsNumber = this.dotsNumber;
        let nowDotLocation = this.center,
        // let nowCenter;
        index = 0;
        // while(dotIds.length>0){
        //     let dot = dotsNumber[index];
        //     if(!nowCenter){
        //         nowCenter = dot;
        //         setLocation(dot)
        //     }
        // }
    }
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