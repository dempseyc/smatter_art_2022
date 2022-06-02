import React, { Component } from 'react'
import Dot from './Dot'

export default class DisplayLayer extends Component {

  constructor(props) {
    super(props);
    this.layer = this.props.layerNum;
  }

  makeDots() {
    // console.log(this.props.data, "data in dl");
    return(
      this.props.data.data.map((d,i)=>{
        return (
          <Dot 
              key={i}
              layer={this.layer}
              dotStyle={this.props.layers[this.layer-1].dotStyle} 
              dotColor1={this.props.layers[this.layer-1].dotColor1}
              dotColor2={this.props.layers[this.layer-1].dotColor2}
              outerOpacity={this.props.layers[this.layer-1].outerOpacity}
              dotSize={this.props.layers[this.layer-1].dotSize} 
              position={d}
          >
          </Dot>
        )
      })
    );
  }

  render() {
    return (
      <div className="DisplayLayer">
        {this.makeDots()}
      </div>
    )
  }
}