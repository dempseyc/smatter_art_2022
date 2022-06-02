// based from:
// https://codepen.io/_danko/pen/JKaxKE?editors=0010

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './MiniSlider.scss';

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      red: 126,
      green: 126,
      blue:126,
    };
  }
  update(e) {
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.input).value,
      green: ReactDOM.findDOMNode(this.refs.green.refs.input).value,
      blue: ReactDOM.findDOMNode(this.refs.blue.refs.input).value,
    });
  }
  render() {
    const bgc = `rgb(${this.state.red}, ${this.state.green}, ${this.state.blue})`;
    const body = document.body;
    let myStyle = {
      backgroundColor: bgc    
    };
    body.style.backgroundColor =  bgc;
    
    return (
      <div className="color-picker">
        <div className="bgc-heading" style={myStyle}>BG COLOR</div>        
        <Slider ref="red" min="0" max="255" col="red" val={this.state.red} update={() => this.update()} >{this.state.red}</Slider>         
        <Slider ref="green" min="0" max="255" col="green" val={this.state.green} update={() => this.update()} >{this.state.green}</Slider> 
        <Slider ref="blue" min="0" max="255" col="blue" val={this.state.blue} update={() => this.update()} >{this.state.blue}</Slider>
      </div>
    );
  }
}

class Slider extends React.Component {
  render() {
    return (
      <div className="channel">
        <label className="mini-output">{this.props.col}: {this.props.children}</label>
          <input
            className="mini-input"
            ref="input" 
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