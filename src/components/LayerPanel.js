// import React, { Component } from 'react'
import BlendModeChooser from './BlendModeChooser'
import DotSizeChooser from './DotSizeChooser'
import DotQtyChooser from './DotQtyChooser'
import DotColorChooser from './DotColorChooser'
import DotStyleChooser from './DotStyleChooser'
import './Editor.scss'

const LayerPanel = (props) => {
	const { activeLayer, layerNum } = props;
	const classnames = (activeLayer === layerNum) ? `LayerPanel l-${layerNum} active` : `LayerPanel l-${layerNum} not-active`;

	return (
	<div  
	className={ classnames }
	>
		<DotQtyChooser
			layerNum= {layerNum}
			// dotQty= {data.layers[layerNum-1].dotQty}
			// data= {data}
		/>
		<DotSizeChooser
			layerNum= {layerNum}
			param="size"
		/>
		<br></br>
		<DotStyleChooser
			key="style"
			param="style"
			layerNum={layerNum}
		/>
		<br></br>
		<DotColorChooser
			key="dcc-1"
			param="color"
			layerNum={layerNum}

		/>
		<br></br>
		<DotColorChooser
			key="dcc-2"
			param="color2"
			layerNum={layerNum}
		/>
	</div>
	)
}

export default LayerPanel