import {useStoreState, useStoreActions} from 'easy-peasy';
import MiniSlider from './MiniSlider';
import './Editor.scss';
import { sizes } from '../dotStyles';

const DotSizeChooser = (props) => {
	const {layerNum, param} = props;
	const values = sizes;
	const size = useStoreState(state => state.dotSets[layerNum][param]);
	const updateDotSet = useStoreActions(actions => actions.updateDotSet);
	const val = values.indexOf(size);

	const update = (newVal) => {
		updateDotSet({param: param, index: layerNum, value: values[newVal]});
		return newVal;
	}

	return (
		<div className="DotSizeChooser">
			<MiniSlider
				min="0" 
				max={values.length-1} 
				step="1"
				values={values}
				value={val}
				label={param.toUpperCase()}
				output={values[val]}
				update={update}
			/>
		</div>
	)
}

export default DotSizeChooser