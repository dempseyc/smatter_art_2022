import {useStoreState, useStoreActions} from 'easy-peasy';
import ExpandingChooser from './ExpandingChooser';
import './Editor.scss';
import { colors, $pallette_1, $pallette_2, $pallette_3, $pallette_4 } from '../dotStyles';

const DotColorChooser = (props) => {
	const { layerNum, param } = props;
	const color = useStoreState(state => state.dotSets[layerNum][param]);
	const updateDotSet = useStoreActions(actions => actions.updateDotSet);
	const pallette = $pallette_4;

	const update = (newVal) => {
		updateDotSet({param: param, index: layerNum, value: newVal});
		return newVal;
	}

    const ChoiceButton = (color) => {
        return (
            <div 
				key={`cb-${param}-${color}`}
                className={`pallette-tile`}
                style={{backgroundColor: pallette[color]}}>
            </div>
        )
    }

	return (
		<div className={`DotColorChooser ${param}`}>
			<ExpandingChooser
				// key={param}
				values={Array.from({ length: pallette.length }, (item,i) => i )}
				value={color}
				label={param.toUpperCase()}
				output={ChoiceButton}
				update={update}
			/>
		</div>
	)
}

export default DotColorChooser