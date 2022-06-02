import React, { Component } from 'react'
import DotTracker from './DotTracker'
import Display from './Display'
import Editor from './Editor'

export default class Container extends Component {

  constructor () {
    super();
    this.blendModes = [
        "screen",
        "darken", 
        "opaque"
    ];

    this.numLayers = 5;

    this.dotTracker = new DotTracker(this.numLayers);

    let layerArr = [];

    for (let i=1; i<=this.numLayers; i++) {
      layerArr.push({
        blendMode: "screen",
        dotColor1: "rgba(0, 0, 0, 1)",
        dotColor2: "rgba(0, 0, 0, 0)",
        outerOpacity: "0",
        dotSize: 10,
        dotQty: 6
      });

    }

    this.dotPosData = this.dotTracker.dotPosData;

    this.state = {
      uiData: {
        layers: layerArr
      },
      displayData: { 
        layerArray: this.dotPosData
      },
    };

    this.updateDisplay = this.updateDisplay.bind(this);
    this.updateBlendMode = this.updateBlendMode.bind(this);
    this.updateDotColor1 = this.updateDotColor1.bind(this);
    this.updateDotColor2 = this.updateDotColor2.bind(this);
    this.updateOuterOpacity = this.updateOuterOpacity.bind(this);
    this.updateDotSize = this.updateDotSize.bind(this);
    this.updateDotQty = this.updateDotQty.bind(this);

    this.updateQualitiesRandom = this.updateQualitiesRandom.bind(this);

    this.updateAlgo = this.updateAlgo.bind(this);

    this.updateQualitiesRandom();
    
  }  // end constructor

  ranMM(min,max) {
    return Math.floor(Math.random()*max)+min;
  }

  randomColor() {
    let r = this.ranMM(0,255);
    let g = this.ranMM(0,255);
    let b = this.ranMM(0,255);
    let a = this.ranMM(0,100)/100;
    // let str = `rgba(${r},${g},${b},${a})`;
    // return str;
    return {r: r, g: g, b: b, a: a};
  }

  randomOpacity() {
    return Math.random();
  }

  randomSize() {
    return Math.pow(this.ranMM(1,10),2) * 3;
  }

  randomQty() {
    return this.ranMM(1,30);
  }

  updateBlendMode (blendMode,layerNum) {
    let newArr = this.state.uiData.layers;
    newArr[layerNum-1].blendMode = blendMode;

    this.setState({
      uiData: { layers: newArr }
    }, () => { this.updateDisplay(); })

  }
  
  updateDotColor1 (dotColor1,layerNum) {
    let newArr = this.state.uiData.layers;
    newArr[layerNum-1].dotColor1 = dotColor1;

    this.setState({
      uiData: { layers: newArr }
    }, () => { this.updateDisplay(); })

  }  

  updateDotColor2 (dotColor2,layerNum) {
    let newArr = this.state.uiData.layers;
    newArr[layerNum-1].dotColor2 = dotColor2;

    this.setState({
      uiData: { layers: newArr }
    }, () => { this.updateDisplay(); })

  }

  updateOuterOpacity (val, layerNum) {
    let newArr = this.state.uiData.layers;
    newArr[layerNum-1].outerOpacity = val;

    this.setState({
      uiData: { layers: newArr }
    }, () => { this.updateDisplay(); })
  }

  updateDotSize (dotSize,layerNum) {
    console.log (this.state.uiData.layers);
    let newArr = this.state.uiData.layers;
    newArr[layerNum-1].dotSize = dotSize;

    this.setState({
      uiData: { layers: newArr }
    }, () => { this.updateDisplay(); })

  }
  
  updateDotQty (dotQty,layerNum) {
    let newArr = this.state.uiData.layers;
    newArr[layerNum-1].dotQty = dotQty;
    this.dotPosData = this.dotTracker.updateDotData(layerNum,dotQty);

    this.setState({
      uiData: { layers: newArr },
      displayData: { layerArray: this.dotPosData }
    }, () => { this.updateDisplay(); })

  }

  updateAlgo (algo,layerNum) {
    let newArr = this.state.uiData.layers;
    newArr[layerNum-1].algo = algo;
    this.dotPosData = this.dotTracker.runAlgo(layerNum,algo);

    this.setState({
      uiData: { layers: newArr },
      displayData: { layerArray: this.dotPosData }
    }, () => { this.updateDisplay(); })

  }

  updateQualitiesRandom () {
    for (let i=0; i<this.numLayers; i++) {
      let layerNum = i+1;
      let color1 = this.randomColor();
      let color2 = this.randomColor();
      let dotSize = this.randomSize();
      let qty = this.randomQty();
      let opacity = this.randomOpacity();
      this.updateDotQty(qty,layerNum);
      this.updateDotSize(dotSize, layerNum);
      this.updateDotColor1(color1, layerNum);
      this.updateDotColor2(color2, layerNum);
      this.updateOuterOpacity(opacity, layerNum);
    }
    // this.updateDisplay();
  }

  // this forceUpdate does what is needed from container
  updateDisplay() {
    this.forceUpdate();
  }

  render() {
    // console.log(this.displayUpdate, "in c");
    return (
      <div className="Container">
        <Display
            numLayers= {this.numLayers}
            dotPosData= {this.dotPosData}
            layers= {this.state.uiData.layers}
         >
        </Display>
        <Editor data={{ 
          blendModes: this.blendModes,
          numLayers: this.numLayers,
          layers: this.state.uiData.layers,
          updateBlendMode: this.updateBlendMode,
          updateDotColor1: this.updateDotColor1,
          updateDotColor2: this.updateDotColor2,
          updateOuterOpacity: this.updateOuterOpacity,
          updateDotSize: this.updateDotSize,
          updateDotQty: this.updateDotQty,
          updateAlgo: this.updateAlgo
          }} />
      </div>
    )
  }
}
