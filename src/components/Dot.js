import React from 'react'

import {useStoreState} from 'easy-peasy'
// import { useEffect } from 'react';

import './Dot.css';

const Dot = (props) => {
	const { dot, color, size, id, index } = props;

	const xPos = useStoreState(state => state.dotData[index].xPos);
	const yPos = useStoreState(state => state.dotData[index].yPos);


	let pxSize = size * 10;

	let radius = `${pxSize / 2}`;
	let negRadius = `${0-pxSize / 2}`;
	let dotSize = `${pxSize}`;
	// let viewBox = `0 0 ${dotSize} ${dotSize}`;

	return (
		<div
		className={`${id} ${dot.nn1}${dot.nn2}${dot.nn3} ${dot.strategy} dot-position`}x
		style={{
		left: `${xPos}%`,
		top: `${yPos}%`
		}}>
		{/* <span>{`x: ${xPos},y: ${yPos}, ${updatedAt}`}</span> */}
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

			<circle fill={color} cx={radius} cy={radius} r={radius}/>

			</svg>
		</div>
		</div>
	)
}

export default Dot