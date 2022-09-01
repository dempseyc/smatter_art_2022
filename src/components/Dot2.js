import React from 'react'

import {useStoreState} from 'easy-peasy'
import Shape from './Shape'

import './Dot.css';

const Dot = (props) => {
	const { color, color2, style, size, index } = props;

	const xPos = useStoreState(state => state.dotData[index].xPos);
	const yPos = useStoreState(state => state.dotData[index].yPos);
    const dot = useStoreState(state => state.dotData[index]);

    let rot = (dot.xTwin) ? Math.atan2(dot.v1.y,dot.v1.x)*180/Math.PI + 90 : 90;

	return (
        <>
        <Shape 
        style={style}
        color={color}
        color2={color2}
        size={size}
        xPos={xPos}
        yPos={yPos}
        rot={rot}
        />
            {/* <circle className={`${dot.id} to`} fill="red" cx={dot.tox} cy={dot.toy} r={0.5}/> */}
            {/* <line className="dot-v0" x1={`${dot.xPos}`} y1={`${dot.yPos}`} x2={`${dot.xPos+dot.v0.x}`} y2={`${dot.yPos+dot.v0.y}`} stroke="blue" /> */}
            {/* <circle className="dot-p3" cx={`${dot.p3.x}`} cy={`${dot.p3.y}`} r={0.2} fill="blue" /> */}
        </>

	)
}

export default Dot