import {useStoreState, useStoreActions} from 'easy-peasy';
import ExpandingChooser from './ExpandingChooser';
import Shape from './Shape'
import './Editor.scss';
import { colors, $pallette_1, $pallette_2, $pallette_3, styles } from '../dotStyles';

const DotStyleChooser = (props) => {
	const { layerNum, param } = props;
	const color = useStoreState(state => state.dotSets[layerNum].color);
    const color2 = useStoreState(state => state.dotSets[layerNum].color2);
    const style = useStoreState(state => state.dotSets[layerNum].style);
	const updateDotSet = useStoreActions(actions => actions.updateDotSet);
	const pallette = $pallette_3;

	const update = (newVal) => {
		updateDotSet({param: param, index: layerNum, value: newVal});
		return newVal;
	}

    const ChoiceButton = (style) => {
        return (
            <svg viewBox='0 0 60 60'>
                <g>
            <Shape
            style={style}
            color={pallette[color]}
            color2={pallette[color2]}
            size={'15'}
            xPos={'30'}
            yPos={'30'}
            rot={0}
            />
            </g>
            </svg>
        )
    }

	return (
		<div className={`DotStyleChooser ${param}`}>
			<ExpandingChooser
				key={param}
				values={styles}
				value={style}
				label={param.toUpperCase()}
				output={ChoiceButton}
				update={update}
			/>
		</div>
	)
}

export default DotStyleChooser