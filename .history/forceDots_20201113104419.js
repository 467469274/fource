class Force{
    constructor(center){
        this.center = center;
    }
    lines(lines){
        let linesInfo = {};
        console.log(lines)
        for(let i = 0;i<lines.length;i++){
            let line = lines[i];
            const {target,source} = line;

            linesInfo[target.id] +=1;
            linesInfo[source.id] +=1 || 0;
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