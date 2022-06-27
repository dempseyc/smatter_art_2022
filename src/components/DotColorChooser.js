import React, { Component } from 'react';
import MiniSlider from './MiniSlider.js';
import './Editor.scss';

export default class DotColorChooser extends Component {
    constructor(props) {
        super(props);

        this.layer = this.props.layerNum;
        this.type = this.props.type;
        this.dotColor = this.props.dotColor;

        if (this.type==="inner-color") {
            this.header = "COLOR 1";
            this.className = "DotColorChooser1";
            this.updateColor = this.props.data.updateDotColor1;
        } else {
            this.header = "COLOR 2";
            this.className = "DotColorChooser2";
            this.updateColor = this.props.data.updateDotColor2;
        }

        this.state = {
            expanded: false,
            red: this.props.dotColor.r,
            green: this.props.dotColor.g,
            blue: this.props.dotColor.b,
            alpha: this.props.dotColor.a,
            dotColor: `rgba(${this.props.dotColor.r},${this.props.dotColor.g},${this.props.dotColor.b},${this.props.dotColor.a})`
        };

        this.changeDotColor = this.changeDotColor.bind(this);
        this.updateRed = this.updateRed.bind(this);
        this.updateGreen = this.updateGreen.bind(this);
        this.updateBlue = this.updateBlue.bind(this);
        this.updateAlpha = this.updateAlpha.bind(this);

    }

    changeDotColor(dc,dcObj,layer) {
        this.setState({
            dotColor: dc
        }, this.updateColor(dcObj,layer) )
    }

    changeOuterOpacity(val,layer) {
        this.props.data.updateOuterOpacity(val,layer);
    }

    updateRed(e) {
        let val = e.target.value;
        let dc = `rgba(${val}, ${this.state.green}, ${this.state.blue}, ${this.state.alpha})`;
        let dcObj = {r: val, g: this.state.green, b: this.state.blue, a: this.state.alpha};
        this.setState({
            dotColor: dc,
            red: val
        }, () => {
            this.changeDotColor(dc,dcObj,this.layer);
        })
    }

    updateGreen(e) {
        let val = e.target.value;
        let dc = `rgba(${this.state.red}, ${val}, ${this.state.blue}, ${this.state.alpha})`;
        let dcObj = {r: this.state.red, g: val, b: this.state.blue, a: this.state.alpha};
        this.setState({
            dotColor: dc,
            green: val
        }, () => {
            this.changeDotColor(dc,dcObj,this.layer);
        })
    }

    updateBlue(e) {
        let val = e.target.value;
        let dc = `rgba(${this.state.red}, ${this.state.green}, ${val}, ${this.state.alpha})`;
        let dcObj = {r: this.state.red, g: this.state.green, b: val, a: this.state.alpha};
        this.setState({
            dotColor: dc,
            blue: val
        }, () => {
            this.changeDotColor(dc,dcObj,this.layer);
        })
    }

    updateAlpha(e) {
        let val = e.target.value;
        let dc = `rgba(${this.state.red}, ${this.state.green}, ${this.state.blue}, ${val})`;
        let dcObj = {r: this.state.red, g: this.state.green, b: this.state.blue, a: val};
        this.setState({
            dotColor: dc,
            alpha: val
        }, () => {
            this.changeDotColor(dc,dcObj,this.layer);
            this.changeOuterOpacity(val,this.layer);
        })
    }

    render() {
        let layer = this.layer;
        let red = `red-${layer}`;
        let green = `green-${layer}`;
        let blue = `blue-${layer}`;
        let alpha = `alpha-${layer}`;
    
        return (
        <div className={this.className}>
            <div className="dc-heading" style={{backgroundColor: `${this.state.dotColor}`}}>{this.header}</div>        
            <MiniSlider ref={red} min="0" max="255" channel="red" val={this.state.red} update={this.updateRed} >{this.state.red}</MiniSlider>         
            <MiniSlider ref={green} min="0" max="255" channel="green" val={this.state.green} update={this.updateGreen} >{this.state.green}</MiniSlider> 
            <MiniSlider ref={blue} min="0" max="255" channel="blue" val={this.state.blue} update={this.updateBlue} >{this.state.blue}</MiniSlider>
            <MiniSlider ref={alpha} min="0" max="1" channel="alpha" step="0.01" val={this.state.alpha} update={this.updateAlpha} >{this.state.alpha}</MiniSlider>
        </div>
        );
    }
}