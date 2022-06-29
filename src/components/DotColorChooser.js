import {useState} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import ExpandingChooser from './ExpandingChooser';
import './Editor.scss';
import { colors, $pallette_1 } from '../dotStyles';

const DotColorChooser = ({layerNum}) => {
	const color = useStoreState(state => state.dotSets[layerNum].color);
	const updateDotSet = useStoreActions(actions => actions.updateDotSet);

	const update = (newVal) => {
		updateDotSet({param: 'color', index: layerNum, value: newVal});
		return newVal;
	}

    const ChildButton = (color) => {
        return (
            <div 
                className={`pallette-tile`}
                style={{backgroundColor: $pallette_1[color]}}>
            </div>
        )
    }

	return (
		<div className="DotColorChooser">
			<ExpandingChooser
				values={colors}
				value={color}
				label="Color"
				output={ChildButton}
				update={update}
			/>
		</div>
	)
}

export default DotColorChooser