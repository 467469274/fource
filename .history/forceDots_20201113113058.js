class Force{
    constructor(center){
        this.center = center;
        this.minDeg = 15;
    }
    lines(lines){
        let linesInfo =[];
        for(let i = 0;i<lines.length;i++){
            let line = lines[i];
            const {target,source} = line;
            objLineData(linesInfo,target)
            objLineData(linesInfo,source)
        }
        linesInfo.sort((a,b)=>b.numbers-a.numbers);
        this.dotsNumber = linesInfo;
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
        let nowDotLocation = this.center;
        while(dotIds.length>0){
            
        }
    }
}
function copy(obj){
    return JSON.parse(JSON.stringify(obj))
}
function objLineData(array,key){
    // let hasO = obj.hasOwnProperty(key);
    let now = array.find(item=>item.name === key)
    if(now)now.numbers +=1;
    else array.push({name:key,numbers:1})
}