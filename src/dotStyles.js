export const sizes = [1, 2, 3, 5, 8, 13, 21, 34, 55];
export const colors = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
export const blendModes = [
    "screen",
    "darken", 
    "opaque"
];
export const styles = [0,1,2,3]

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

export const $pallette_4 = [
  "#555555",
  "#dd00dd",
  "#dddd00",
  "#00dddd",
  "#6e6e6e",
  "#dd6edd",
  "#dddd6e",
  "#6edddd",
  "#dddddd",
  "#dda5dd",
  "#dddda5",
  "#a5dddd",
]


const $r_025 = '#dd000040';
const $r_050 = '#dd000080';
const $r_075 = '#dd0000c0';
const $r_100 = '#dd0000ff';
const $g_025 = '#00dd0040';
const $g_050 = '#00dd0080';
const $g_075 = '#00dd00c0';
const $g_100 = '#00dd00ff';
const $b_025 = '#0000dd40';
const $b_050 = '#0000dd80';
const $b_075 = '#0000ddc0';
const $b_100 = '#0000ddff';
const $w_025 = '#dddddd40';
const $w_050 = '#dddddd80';
const $w_075 = '#ddddddc0';
const $w_100 = '#ddddddff';

export const $pallette_2 = [
  $r_100, $r_075, $r_050, $r_025, 
  $g_100, $g_075, $g_050, $g_025,
  $b_100, $b_075, $b_050, $b_025,
  $w_100, $w_075, $w_050, $w_025 ];

function ran (n) {
  return Math.floor(Math.random()*n);
}

export function color_well (numColors) {
  // [c,m,y]
  const well = [numColors, numColors, numColors ]
  const colors = Array.from({length: numColors}, e  => Array(3).fill(0));
  
  for (let  i = 0 ; i < numColors*3 ; i++) {
    if (well[0]>0 || well[1]>0 || well[2]>0) {
      let r = ran(3)
      if (!well[r]>0) { --i; continue; }
      let c = ran(numColors);
      if (colors[c][r]<4) {
        well[r] = well[r] - 1;
        colors[c][r] = colors[c][r] + 1;
      }
    }
  }

  let colorStrs = colors.map(c => {
    return `rgb(${(4-c[0])*55},${(4-c[1])*55},${(4-c[2])*55})`
  })

  return colorStrs;
}

export const $pallette_3 =  color_well(16);


