export const sizes = [1, 2, 3, 5, 8, 13, 21, 34, 55];
export const shapes = [ 'circle' , 'rect', 'tri', 'pent', 'hex', 'star', 'ast'];
export const childShapes = [ 'circle' , 'rect', 'tri', 'pent', 'hex', 'star', 'ast'];
export const childSizes = [0.125, 0.25, 0.333, 0.5, 0.666, 0.75, 0.875, 1];
export const orients = [0, 1, 2, 3]; // to-screen-ns, to-screen-we, to-v1-ns, to-v1-we
export const paddingAmts = [0, 0.5, 1, 1.5, 2, 2.5];
export const yRatios = [4.236, 3.303, 2.414, 1.618, 1.5, 1.333, 1.2, 1, 0.5, 0.333, 0.2, 0.125];
export const colors = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
export const blendModes = [
    "screen",
    "darken", 
    "opaque"
];

const dotStyles = sizes.map(function (s) {
    return {
        size: s,
        shape: 'circle',
        child: false,
        childSize: 0.5,
        orient: 'NS',
        yRatio: 1
    }
})

const $cyan_025 = '#00dddd40';
const $cyan_050 = '#00dddd80';
const $cyan_075 = '#00ddddc0';
const $cyan_100 = '#00ddddff';
const $mage_025 = '#dd00dd40';
const $mage_050 = '#dd00dd80';
const $mage_075 = '#dd00ddc0';
const $mage_100 = '#dd00ddff';
const $yell_025 = '#dddd0040';
const $yell_050 = '#dddd0080';
const $yell_075 = '#dddd00c0';
const $yell_100 = '#dddd00ff';
const $blac_025 = '#00000040';
const $blac_050 = '#00000080';
const $blac_075 = '#000000c0';
const $blac_100 = '#000000ff';

export const $pallette_1 = [
  $cyan_100, $cyan_075, $cyan_050, $cyan_025, 
  $mage_100, $mage_075, $mage_050, $mage_025,
  $yell_100, $yell_075, $yell_050, $yell_025,
  $blac_100, $blac_075, $blac_050, $blac_025 ];