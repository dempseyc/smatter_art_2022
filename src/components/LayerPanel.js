import React, { Component } from 'react'
import BlendModeChooser from './BlendModeChooser'
import DotSizeChooser from './DotSizeChooser'
import DotQtyChooser from './DotQtyChooser'
import DotColorChooser from './DotColorChooser'
import './LayerPanel.css'

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
		/>
		<DotSizeChooser
			layerNum= {layerNum}
			// dotSize= {data.layers[layerNum-1].dotSize}
			// data= {data}
		/>
		<br></br>
		<DotColorChooser
			key= "dcc-1"
			type= "inner-color"
			layerNum= {layerNum}
			// dotColor= {data.layers[layerNum-1].dotColor1}
			// data= {data}
		/>
		<DotColorChooser
			key= "dcc-2"
			type= "outer-color"
			layerNum= {layerNum}
			// dotColor= {data.layers[layerNum-1].dotColor2}
			// data= {data}
		/> */}
	</div>
	)
}

export default LayerPanel