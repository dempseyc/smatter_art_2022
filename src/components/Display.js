// import React, { Component } from 'react'
import { useStoreState } from 'easy-peasy';

// import { useStore } from 'easy-peasy'
import DisplayLayer from './DisplayLayer'


export default function Display (props) {
	// let frame = useStoreState(state => state.frame);
	const {numSets} = props
	const frame = useStoreState(state => state.frame);

	let makeLayer = function (i) {
		return (
			<DisplayLayer
				key={`dl-${i}`}
				layerNum={i}
				numlayers={numSets}
				frame={frame}
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
