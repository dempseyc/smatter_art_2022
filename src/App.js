import { useState, useRef, useEffect } from 'react'

import './CSSreset.css';
import './App.scss';

import { makeDotData, findNs, removeDotData } from './DotSetup'
import { setTargets, chooseStrategy, trackAnim } from './DotMover'

import { useStoreState, useStoreActions } from 'easy-peasy';

import Container from './components/Container';
import Animator from './Animator';

const DataHandler = () => {
	const dotData = useStoreState(state => state.dotData);
	const dotsBySet = useStoreState(state => state.dotsBySet);
	const minMove = 0.05/dotData.length;
	const currMoveAmtSq = useRef();
	const animOn = useStoreState(state => state.animOn);
	const startAnim = useStoreActions(actions => actions.startAnim);
	const stopAnim = useStoreActions(actions => actions.stopAnim);
    const updateDots = useStoreActions(actions => actions.updateDotData);

	console.log('dh renders', animOn);
	// replace with stop after 200steps
	const computeCurrMoveAmtSq = (val) => {
        if (currMoveAmtSq.current != undefined) {
            if (currMoveAmtSq.current <= minMove) {
				stopAnim();
            } else {
                currMoveAmtSq.current = (currMoveAmtSq.current + val) * 0.5 ;
            }
        } else { 
            currMoveAmtSq.current = 1024;
            computeCurrMoveAmtSq(val);
        }
    }

	const animate = () => {
		let data = trackAnim(dotData);
        computeCurrMoveAmtSq(data.distSq);
		updateDots(data.dots);
	}

	const updatedAt = useStoreState(state => state.updatedAt);
	const updatePrev = useRef();
	
	useEffect(() => {
		if (updatePrev.current === undefined || updatePrev.current !== updatedAt) {
			updatePrev.current = updatedAt;
		}
		if (!animOn ) { startAnim(); }
	},[])

	const nextIdx = useStoreState(state => state.nextIdx);
	const updateNextIdx = useStoreActions(actions => actions.updateNextIdx);
	const qtyChanging = useStoreState(state => state.qtyChanging);
	const updateQtyChanging = useStoreActions(actions => actions.updateQtyChanging);
	const qtyChanged = useRef(false);
	const sets = useStoreState(state => state.dotSets);

	if (qtyChanged.current !== qtyChanging.status) { qtyChanged.current = qtyChanging.status; }
	
	const addOrRemoveDots = (qty,setId,prevQty) => {
		stopAnim();
		// let dots = [...dotData];
		let dots = dotData;
		if (qty > 0) {
			let newDots = makeDotData(qty,setId,nextIdx,prevQty);
			dots = dots.concat(newDots);
			dots = dots.map(dot => findNs(dot,dots));
			dots = dots.map(dot => setTargets(dot,dots));
			dots = dots.map(dot => chooseStrategy(dot));
			updateDots(dots);
			updateNextIdx(nextIdx+qty);
		} else if (qty < 0) {
			dots = removeDotData(qty,setId,dots);
			dots = dots.map(dot => findNs(dot,dots));
			dots = dots.map(dot => setTargets(dot,dots));
			dots = dots.map(dot => chooseStrategy(dot));
			updateDots(dots);
		}
		return;
	}

	useEffect(() => {
		console.log('ue in dh');
		if (qtyChanging.status) {
			qtyChanged.current = true;

			let currSet = sets[sets.findIndex(s=>s.id===qtyChanging.setId)];
			let prevQty = (dotsBySet[qtyChanging.setId]) ? dotsBySet[qtyChanging.setId].length : 0;
			let diff = 0;
			if (prevQty !== currSet.qty) {
				diff = currSet.qty - prevQty;
				addOrRemoveDots(diff,currSet.id,prevQty);
				currMoveAmtSq.current = 1024;
				startAnim();
			} 

			updateQtyChanging({status:false, setId: currSet.id});
		}
	}, [qtyChanged.current])

	return (
		animOn ? 
		<Animator 
		  effect={animate}
		/> 
		: null
	)
}

const DotMaker2 = ({cb}) => {
	const sets = useStoreState(state => state.dotSets);
	const initialize = useStoreActions(actions => actions.initDotData);
	// const reset = useStoreActions(actions => actions.reset);
	const updateNextIdx = useStoreActions(actions => actions.updateNextIdx);
	
	console.log('dm2rendrs');
	
	const firstMake = () => {
		let nextIdx = 0;
		let dots = [];
		sets.forEach((s,i) => {
			let set = makeDotData(s.qty,s.id,nextIdx);
			dots = dots.concat(set);
			nextIdx = nextIdx + set.length;
		});
			dots = dots.map(dot => findNs(dot,dots));
			dots = dots.map(dot => setTargets(dot,dots));
			dots = dots.map(dot => chooseStrategy(dot));
		initialize(dots);
		updateNextIdx(nextIdx);
	}

	useEffect(() => {
		firstMake();
		cb();
		// return reset;
	}, [])
}

export default function App () {
	const [init,setInit] = useState(false);
	const cb = () => setInit(true);
	console.log('app renders');

	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">SMATTER_art</h1>
			</header>
			{(!init) ? <DotMaker2 cb={cb}/> : <DataHandler />}
			<Container init={init}/>
		</div>
	);
}