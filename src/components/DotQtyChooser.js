import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions} from 'easy-peasy'
import './LayerPanel.css'

const DotQtyChooser = (props) => {
	const {layerNum} = props;
	// react says choose between controlled and uncontrolled
	const qty = useStoreState(state => state.dotSets[layerNum].qty);
	const [val, setVal] = useState(qty);
	const setQty = useStoreActions(actions => actions.updateQty);
	// useEffect(() => setVal(qty),[]);

	const handleChange = (e) => {
		setVal(e.target.value);
		// debounce , make blinking, then execute;
		setTimeout(() => {
			setQty({index: layerNum, val: val});
		},500)
	}

	// const debouncedHandleChange = () => {
	// 	// like this
	// }

	return (
		<form className="DotQtyChooser">
			<label>Dot Qty: </label>
			<input value={val} onChange={handleChange} >
			</input>
			<label> * 2</label>
		</form>
	)
}

export default DotQtyChooser