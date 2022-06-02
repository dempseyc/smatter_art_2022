//  constructor takes a number and an array of objs
import AlgoRunner from '../AlgoRunner';

export default class DotTracker {
    constructor(numLayers) {

        this.numLayers = numLayers;
        this.mode = "twin";
        this.dotQtyInput = 5;  // multiplied by 2
        this.makeLayerData = this.makeLayerData.bind(this);
        this.setDotData = this.setDotData.bind(this);
        this.dotPosData = [];
        this.makeLayerData();
    }
    
    ranPos(min,max) {
        return Math.floor(Math.random()*max)+min;
    }

    setDotData(dotQtyInput, mode) {
        if (!dotQtyInput) { dotQtyInput = this.dotQtyInput; }
        let dotQty = dotQtyInput * 2;
        if (!mode) { mode = this.mode; }
        let layerPosData = [];

        let addDot = function (i, style, x, y) {
            layerPosData.push({
              idx: i,
              dot_style: style,
              xPos: x, 
              yPos: y
            });
        }

        for(let i = 0; i<dotQty; i++) {
            let yPos = this.ranPos(0,200)/2;
            let xPos = this.ranPos(0,200)/2;
            let xPosT = 100 - xPos; 
            if (mode==="twin") {
                addDot(i, "blotch", xPos, yPos);
                addDot(i+1, "blotch", xPosT, yPos);
                i++;
            } else {
                addDot(i, "blotch", xPos, yPos);
            }
        }

        return layerPosData;
    
    }

    makeLayerData() {
        for(let i = 0; i<this.numLayers; i++) {
            this.dotPosData.push({
                layer_idx: i,
                algo: "random",
                data: this.setDotData()
            });
        }
        return this.dotPosData;

    }

    updateDotData(layerNum, dotQtyInput) {
        this.dotPosData[layerNum-1].data = this.setDotData(dotQtyInput);
        return this.dotPosData;
    }

    runAlgo(layerNum, algo) {
        this.dotPosData[layerNum-1].data = AlgoRunner(this.dotPosData[layerNum-1].data, algo);
        return this.dotPosData;
    }

}