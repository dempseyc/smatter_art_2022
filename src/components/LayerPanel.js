// import React, { Component } from 'react'
import BlendModeChooser from './BlendModeChooser'
import DotSizeChooser from './DotSizeChooser'
import DotQtyChooser from './DotQtyChooser'
import DotColorChooser from './DotColorChooser'
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
		{/* <BlendModeChooser
			layerNum= {layerNum}
			// data={data}
			// blendModes={data.blendModes}
		/> */}
		<DotSizeChooser
			layerNum= {layerNum}
		/>
		<br></br>
		<DotColorChooser
			key="dcc-1"
			param="color"
			layerNum={layerNum}

		/>
		<DotColorChooser
			key="dcc-2"
			param="childColor"
			layerNum={layerNum}
		/>
	</div>
	)
}

export default LayerPanel