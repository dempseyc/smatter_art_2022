import React from 'react'

import {useStoreState} from 'easy-peasy'
// import { useEffect } from 'react';

import './Dot.css';

const Dot = (props) => {
	const { dot, color, size, id, index } = props;

	const xPos = useStoreState(state => state.dotData[index].xPos);
	const yPos = useStoreState(state => state.dotData[index].yPos);


	let pxSize = size;

	let radius = `${pxSize / 2}`;
	let negRadius = `${0-pxSize / 2}`;
	let dotSize = `${pxSize}`;

	return (
        <>

		    <circle fill={color} cx={xPos} cy={yPos} r={radius}/>

        </>

	)
}

export default Dot