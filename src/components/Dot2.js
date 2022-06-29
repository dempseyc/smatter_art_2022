import React from 'react'

import {useStoreState} from 'easy-peasy'
// import { useEffect } from 'react';

import './Dot.css';

const Dot = (props) => {
	const { dot, color, size, id, index } = props;

	const xPos = useStoreState(state => state.dotData[index].xPos);
	const yPos = useStoreState(state => state.dotData[index].yPos);

	let radius = `${size / 2}`;
	let negRadius = `${0-size / 2}`;
	let dotSize = `${size}`;

	return (
        <>

		    <circle fill={color} cx={xPos} cy={yPos} r={radius}/>

        </>

	)
}

export default Dot