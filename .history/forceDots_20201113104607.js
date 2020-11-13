class Force{
    constructor(center){
        this.center = center;
    }
    lines(lines){
        let linesInfo = {};
        for(let i = 0;i<lines.length;i++){
            let line = lines[i];
            const {target,source} = line;
            linesInfo[target.id] = linesInfo[target.id]? linesInfo[target.id]+=1 :0;
            linesInfo[source.id]? linesInfo[source.id]+=1 :0;
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
function objSetData(obj,key,data){
    linesInfo[target.id] = linesInfo[target.id]? linesInfo[target.id]+=1 :0;
}