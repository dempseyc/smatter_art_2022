import React, { Component, useState } from 'react'

const LayerButton = (props) => {
    const { layerNum, activeLayer, handleClick, numLayers } = props;
    const displayNum = (layerNum !== numLayers) ? layerNum+1 : "+";
    const classnames = (activeLayer === layerNum) ? `LayerButton-${layerNum} active` : `LayerButton-${layerNum} not-active`
    return (
        <button className={classnames} onClick={handleClick}>
            <span>{displayNum}</span>
        </button>
    )
}

export default LayerButton