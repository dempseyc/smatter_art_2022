import React, { Component } from 'react';
import './Editor.scss';

export default class DotSizeChooser extends Component {

  constructor(props) {
    super(props);
    this.layer = this.props.layerNum;
    this.state = {
      value: this.props.dotSize
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    }, this.props.data.updateDotSize(event.target.value,this.layer));
  }

  render() {
    return (

       <div className="DotSizeChooser">
          <DotSizeSlider 
            ref={this.layer+"-dot-size"} 
            min="5" 
            max="850" 
            step="5" 
            val={this.state.value} 
            update={(e) => this.handleChange(e)} >{this.state.value}
          </DotSizeSlider>
      </div>
    )
  }
}

class DotSizeSlider extends React.Component {
  render() {
    return (
      <div className="channel">
        <label className="mini-output">Dot Size: {this.props.children}</label>
          <input
            className="mini-input"
            ref={this.layer+"-dot-size-input"}
            value={this.props.val}
            type="range" 
            min={this.props.min} 
            max={this.props.max} 
            step={this.props.step} 
            onChange={this.props.update} 
          /> 
     </div>
    )
  }
}