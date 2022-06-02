import React, { Component } from 'react';
import './Dot.css';

export default class Dot extends Component {

  render() {
    let innerColor = `rgba(${this.props.dotColor1.r},${this.props.dotColor1.g},${this.props.dotColor1.b},${this.props.dotColor1.a})`;
    let outerColor = `rgba(${this.props.dotColor2.r},${this.props.dotColor2.g},${this.props.dotColor2.b},${this.props.dotColor2.a})`;
    let outerOpacity = `${this.props.outerOpacity}`;
    let dotStyle = this.props.dotStyle;
    let radius = `${this.props.dotSize / 2}`;
    let negRadius = `${0-this.props.dotSize / 2}`;
    let dotSize = `${this.props.dotSize}`;
    // let viewBox = `0 0 ${dotSize} ${dotSize}`;
    let layer = this.props.layer;
    let layerGradient = `${layer}-gradient`;
    let lgURL = `url(#${layerGradient})`;

    return (
      <div
      className="dot-position"
      style={{
        left: `${this.props.position.xPos}%`,
        top: `${this.props.position.yPos}%`
      }}>
        <div
          className="dot-offset-radius"
          style={{
            left: `${negRadius}px`,
            top: `${negRadius}px`
        }}>
          <svg
            x={negRadius} 
            y={negRadius}
            width={dotSize}
            height={dotSize} 
            // viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id={layerGradient}>
                <stop offset="0%" stopColor={innerColor}/>
                <stop offset="100%" stopColor={outerColor} stopOpacity={outerOpacity}/>
              </radialGradient>
            </defs>

            <circle fill={lgURL} cx={radius} cy={radius} r={radius}/>
          </svg>
        </div>
      </div>
    )
  }
}