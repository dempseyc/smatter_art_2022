const sizes = [1, 2, 3, 5, 8, 13, 21, 34, 55];
const shapes = [ 'circle' , 'rect', 'tri', 'pent', 'hex', 'star', 'ast'];
const childSizes = [0.125, 0.25, 0.333, 0.5, 0.666, 0.75, 0.875, 1];
const childShrinks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const orients = [0, 1, 2, 3]; // to-screen-nw, to-screen-we, to-v1-nw, to-v1-we
const paddingAmts = [0, 0.5, 1, 1.5, 2, 2.5];
const yRatios = [4.236, 3.303, 2.414, 1.618, 1.5, 1.333, 1.2, 1, 0.5, 0.333, 0.2, 0.125];
const blendModes = [
    "screen",
    "darken", 
    "opaque"
];

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