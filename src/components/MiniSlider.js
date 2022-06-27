import React, { Component } from 'react';
import './Editor.scss';

export default class MiniSlider extends Component {

    constructor (props) {
        super(props);
        this.channel = this.props.channel;
        this.state = {
            value: this.props.val
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (event) {
        this.setState({
            value: event.target.value
        }, this.props.update(event) )
    }

    render() {
        return (
        <div className="channel">
            <label className="mini-output">{this.props.channel}: {this.props.children}</label>
            <input
                className="mini-input"
                ref="input" 
                value={this.props.val} 
                type="range" 
                min={this.props.min} 
                max={this.props.max} 
                step={this.props.step}
                onChange={this.handleChange}
            /> 
        </div>
        )
  }
}