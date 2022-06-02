import React, { Component } from 'react'
import DisplayLayer from './DisplayLayer'

export default class Display extends Component {

	constructor(props) {
		super(props);
		this.displayLayers = [];

		for (let num=1; num<=this.props.numLayers; num++) {
			this.displayLayers.push(num);
		}
		this.makeDisplayLayers.bind(this);
	}

	makeDisplayLayers() {
		return this.displayLayers.map( (num) => {
			return (
			<DisplayLayer
				key={`dl-${num}`}
				data= {this.props.dotPosData[num-1]}
				layerNum={num}
				layers={this.props.layers}
				numlayers={this.props.numLayers}
				>
			</DisplayLayer>
			)
		}
	)}

	render() {
		return (
		<div className="Display">
			{ this.makeDisplayLayers() }
		</div>
		)
	}
}
