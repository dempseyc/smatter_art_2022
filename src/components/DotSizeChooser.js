import {useState} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import MiniSlider from './MiniSlider';
import './Editor.scss';
import { sizes } from '../dotStyles';

const DotSizeChooser = ({layerNum}) => {
	const size = useStoreState(state => state.dotSets[layerNum].size);
	const updateDotSet = useStoreActions(actions => actions.updateDotSet);
	const val = sizes.indexOf(size);

	const update = (newVal) => {
		updateDotSet({param: 'size', index: layerNum, value: sizes[newVal]});
		return newVal;
	}

	return (
		<div className="DotSizeChooser">
			<MiniSlider
				min="0" 
				max={sizes.length-1} 
				step="1"
				values={sizes}
				value={val}
				label="Size"
				output={sizes[val]}
				update={update}
			/>
		</div>
	)
}

export default DotSizeChooser