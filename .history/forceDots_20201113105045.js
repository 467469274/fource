class Force{
    constructor(center){
        this.center = center;
    }
    lines(lines){
        let linesInfo = {};
        for(let i = 0;i<lines.length;i++){
            let line = lines[i];
            const {target,source} = line;
            objLineData(linesInfo,target)
            objLineData(linesInfo,source)
        }
        this.dotsNumber = linesInfo;
    }
    nodes(dots){
        this.dots = dots;
    }

}
function objLineData(obj,key){
    let hasO = obj.hasOwnProperty(key);
    obj[key] = hasO? obj[key]+=1 :1;
}