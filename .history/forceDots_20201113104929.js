class Force{
    constructor(center){
        this.center = center;
    }
    lines(lines){
        let linesInfo = {};
        for(let i = 0;i<lines.length;i++){
            let line = lines[i];
            console.log(line)
            const {target,source} = line;
            objLineData(linesInfo,target)
            objLineData(linesInfo,source)
        }
        console.log(linesInfo)
    }
    nodes(dots){
        this.dots = dots;
        // let dotsInfo = {};
        // for(let i = 0;i<dots.length;i++){
        //     dots
        // }
    }

}
function objLineData(obj,key){
    let hasO = obj.hasOwnProperty(key);
    obj[key] = hasO? obj[key]+=1 :1;
}