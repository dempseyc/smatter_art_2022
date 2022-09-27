import { useState, useEffect, useRef } from 'react'
import { useStoreState, useStoreActions} from 'easy-peasy'
import './Editor.scss'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

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
	const setId = useStoreState(state => state.dotSets[layerNum].id);
	const updateQty = useStoreActions(actions => actions.updateQty);
	const stopAnim = useStoreActions(actions => actions.stopAnim);
	const [val, setVal] = useState(qty);
	const isValueSettled = useIsSettled(val,1000);
	const [isChanging,setIsChanging] = useState(false);

	const classes = `DotQtyChooser ${isChanging ? "blinking" : ""}`;

	const updateQtyChanging = useStoreActions(actions => actions.updateQtyChanging);

	useEffect(() => {
		if (isValueSettled) {
			if (qty !== val) {
				stopAnim();
				updateQtyChanging({status: true, setId: setId});
				updateQty({index: layerNum, val: val});
			}
			setIsChanging(false);
		}
	},[val, isValueSettled, setIsChanging])
	
	const handleChange = (e) => {
		let val  = e.target.value;
		setIsChanging(true);
		if (val.length>3 || val<2) {return;}
		setVal(e.target.value);
	}

	return (
		<form className={classes}>
			<label>Qty: </label>
			<input value={val} onChange={handleChange} >
			</input>
		</form>
	)
}

export default DotQtyChooser