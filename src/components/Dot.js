// import {useState, useEffect} from 'react'

import {useStoreState} from 'easy-peasy'
import { useEffect } from 'react';

import './Dot.css';

export default function Dot (props) {
  const { dot, color, size } = props;
  // const stateData = useStoreState(state => state.dotData);
  const xPos = dot.xPos;
  const yPos = dot.yPos;

  // useEffect(()=>{
  //   console.log('update')
  // },[stateData])

  if (dot.idx === 0) {
    console.log('dot0 render',xPos,yPos);

  } //
  let pxSize = size * 10;

  // ?? stringifying right away?
  let radius = `${pxSize / 2}`;
  let negRadius = `${0-pxSize / 2}`;
  let dotSize = `${pxSize}`;
  // let viewBox = `0 0 ${dotSize} ${dotSize}`;

  return (
    <div
    className="dot-position"
    style={{
      left: `${xPos}%`,
      top: `${yPos}%`
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

          <circle fill={color} cx={radius} cy={radius} r={radius}/>

        </svg>
      </div>
    </div>
  )
}