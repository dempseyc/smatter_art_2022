// import React, { Component } from 'react'
import { useStoreState } from 'easy-peasy';
import Dot from './Dot'

export default function DisplayLayer (props) {
  // change to byset
  let layerDots = useStoreState( state => state.dotData );

  let makeDots = layerDots.map(function (d,i) {
      return (
        <Dot 
            key={`d-${i}`}
            size={3}
            color='black'
            xPos={d.xPos}
            yPos={d.yPos}
        />
      )
  })

  return (
    <div className="DisplayLayer">
      {makeDots}
    </div>
  )
}