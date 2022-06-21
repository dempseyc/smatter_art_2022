import React, { Component, useState } from 'react'

const LayerButton = (props) => {
    const { layerNum, activeLayer, handleClick } = props;
    const classnames = (activeLayer === layerNum) ? `LayerButton-${layerNum} active` : `LayerButton-${layerNum} not-active`
    return (
        <button className={classnames} onClick={handleClick}>
            <span>{layerNum+1}</span>
        </button>
    )
}

export default LayerButton