let sizes = [ 0.2, 0.33, 0.5, 1, 2, 3, 5, 8, 13, 21];
let shapes = [ 'circle' , 'rect', 'tri', 'pent', 'hex', 'star', 'ast'];
let childSizes = [0.125, 0.2, 0.333, 0.5, 1, 2, 3, 5, 8, 13];
let childShrinks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let orients = ['NS','WE'];
let yRatios = [4.236, 3.303, 2.414, 1.618, 1.5, 1.333, 1.2, 1, 0.5, 0.333, 0.2, 0.125];

export default dotStyles = sizes.map(function (s) {
    return {
        size: s,
        shape: 'circle',
        child: false,
        childSize: 0.5,
        orient: 'NS',
        yRatio: 1
    }
})