export default utils = {
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

}