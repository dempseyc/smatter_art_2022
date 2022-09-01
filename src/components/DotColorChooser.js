import {useStoreState, useStoreActions} from 'easy-peasy';
import ExpandingChooser from './ExpandingChooser';
import './Editor.scss';
import { colors, $pallette_1, $pallette_2, $pallette_3 } from '../dotStyles';

const DotColorChooser = (props) => {
	const { layerNum, param } = props;
	const color = useStoreState(state => state.dotSets[layerNum][param]);
	const updateDotSet = useStoreActions(actions => actions.updateDotSet);
	const pallette = $pallette_3;

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
				values={colors}
				value={color}
				label={param.toUpperCase()}
				output={ChoiceButton}
				update={update}
			/>
		</div>
	)
}

export default DotColorChooser