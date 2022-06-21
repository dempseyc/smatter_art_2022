// import React, { Component } from 'react'
import { useStoreState } from 'easy-peasy';
import DisplayLayer from './DisplayLayer'

export default function Display (props) {
	const numSets = useStoreState(state => state.dotSets.length);

	let makeLayer = function (i) {
		return (
			<DisplayLayer
				key={`dl-${i}`}
				layerNum={i}
				numlayers={numSets}
			/>
		)
	}

	let layers = [];

	for(let i = 0; i < numSets ; i++) {
		layers.push(makeLayer(i));
	}

	return (
		<div className="display">
			{ layers }
		</div>
	)
}
