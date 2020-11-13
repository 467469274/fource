class Force{
    constructor(center){
        this.center = center;
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
    }
    initNodes(){}

}
function objLineData(array,key){
    // let hasO = obj.hasOwnProperty(key);
    let now = array.find(item=>item.name === key)
    if(now)now.numbers +=1;
    else array.push({name:key,numbers:1})
}