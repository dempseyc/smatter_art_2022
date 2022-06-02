import React, { Component } from 'react'
import BlendModeChooser from './BlendModeChooser'
import DotSizeChooser from './DotSizeChooser'
import DotQtyChooser from './DotQtyChooser'
import DotAlgoChooser from './DotAlgoChooser'
import DotColorChooser from './DotColorChooser'
import './LayerPanel.css'

export default class LayerPanel extends Component {

constructor(props) {
    super(props);

    this.state= {
        amActive: this.props.reportActiveLayer(this.props.layerNum)
    }

  }

  componentWillReceiveProps() {
    this.setState({
        amActive: this.props.reportActiveLayer(this.props.layerNum)
    })
  }

  render() {
    let classnames = `LayerPanel l-${this.props.layerNum} active-${this.state.amActive}`;
    // this.reportMyStatus();
    return (
      <div  
      className={ classnames }
      >
        <DotQtyChooser
            layerNum= {this.props.layerNum}
            dotQty= {this.props.data.layers[this.props.layerNum-1].dotQty}
            data= {this.props.data}
        >
        </DotQtyChooser>
        {/* <BlendModeChooser
            layerNum= {this.props.layerNum}
            data={this.props.data}
            blendModes={this.props.data.blendModes}
        >
        </BlendModeChooser> */}
        <DotSizeChooser
            layerNum= {this.props.layerNum}
            dotSize= {this.props.data.layers[this.props.layerNum-1].dotSize}
            data= {this.props.data}
        >
        </DotSizeChooser>
        <br></br>
        <DotColorChooser
            key= "dcc-1"
            type= "inner-color"
            layerNum= {this.props.layerNum}
            dotColor= {this.props.data.layers[this.props.layerNum-1].dotColor1}
            data= {this.props.data}
        />
        <DotColorChooser
            key= "dcc-2"
            type= "outer-color"
            layerNum= {this.props.layerNum}
            dotColor= {this.props.data.layers[this.props.layerNum-1].dotColor2}
            data= {this.props.data}
        />
        <DotAlgoChooser
            layerNum= {this.props.layerNum}
            data= {this.props.data}
        >
        </DotAlgoChooser>
      </div>
    )
  }
}