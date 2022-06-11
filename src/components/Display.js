// import React, { Component } from 'react'
import DisplayLayer from './DisplayLayer'

export default function Display (props) {
	let makeLayer = function (i) {
		return (
			<DisplayLayer
				key={`dl-${i}`}
				layerNum={i}
				numlayers={props.numSets}
			/>
		)
	}

	let layers = [];

	for(let i = 0; i < props.numSets ; i++) {
		layers.push(makeLayer(i));
	}

	return (
		<div className="display">
			{ layers }
		</div>
	)
}
