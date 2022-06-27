import { useState, useEffect, useRef } from 'react'
import { useStoreState, useStoreActions} from 'easy-peasy'
import './Editor.scss'

function useIsSettled(value, delay = 1500) {
	const [isSettled, setIsSettled] = useState(true);
	const isFirstRun = useRef(true);
	const prevValueRef = useRef(value);
  
	useEffect(() => {
	  if (isFirstRun.current) {
		isFirstRun.current = false;
		return;
	  }
	  setIsSettled(false);
	  prevValueRef.current = value;
	  const timerId = setTimeout(() => {
		setIsSettled(true);
	  }, delay);
	  return () => { clearTimeout(timerId); }
	}, [delay, value]);
	if (isFirstRun.current) {
	  return true;
	}
	return isSettled && prevValueRef.current === value;
  }

const DotQtyChooser = (props) => {
	const {layerNum} = props;
	const qty = useStoreState(state => state.dotSets[layerNum].qty);
	const setQty = useStoreActions(actions => actions.updateQty);
	const stopAnim = useStoreActions(actions => actions.stopAnim);
	const [val, setVal] = useState(qty);
	const isValueSettled = useIsSettled(val,1500);

	const updateQtyChanging = useStoreActions(actions => actions.updateQtyChanging);

	
	useEffect(() => {
		if (isValueSettled && (qty !== val)) {
			stopAnim();
			updateQtyChanging({status: true, setId: layerNum});
			setQty({index: layerNum, val: val});
		}
	},[val, isValueSettled])
	
	const handleChange = (e) => {
		setVal(e.target.value);
	}

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