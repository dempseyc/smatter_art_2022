const utils = {
    ranMM: function (min,max) {
        return Math.floor(Math.random()*max)+min;
    },
    randomColor: function () {
        let r = this.ranMM(0,255);
        let g = this.ranMM(0,255);
        let b = this.ranMM(0,255);
        let a = this.ranMM(0,100)/100;
        let str = `rgba(${r},${g},${b},${a})`;
        return {r: r, g: g, b: b, a: a, str: str};
    },
    ranMMexp: function (min,max) {
        let minExp;
        if (min<4) {
            minExp = 1;
        } else {
            for (let exp = 2; Math.pow(2,exp)<= min; exp++) {
                minExp = exp;
            }
        }
        let maxExp;
        for (let exp = 1; Math.pow(2,exp)<= max; exp++) {
            maxExp = exp;
        }
        const ranExp = this.ranMM(minExp,maxExp);
        return Math.pow(2,ranExp);
    }
}

export default utils