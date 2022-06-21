import { useState, useRef, useEffect } from 'react'

import './CSSreset.css';
import './App.scss';

import { makeDotData, findNs } from './DotSetup'
import { setTargets, chooseStrategy, trackAnim } from './DotMover'

import { useStoreState, useStoreActions } from 'easy-peasy';

import Container from './components/Container';
import Animator from './Animator';

const DataHandler = () => {
	// const dotsLength = useStoreState(state => state.dotData.length);
	const dots = useStoreState(state => state.dotData);
	const minMove = 1/dots.length;
	const currMoveAmtSq = useRef();
	// const animOn = useRef();
	const animOn = useStoreState(state => state.animOn);
	const startAnim = useStoreActions(actions => actions.startAnim);
	const stopAnim = useStoreActions(actions => actions.stopAnim);
    const updateDots = useStoreActions(actions => actions.updateDotData);
	console.log('dh renders', animOn);

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
		let data = trackAnim(dots);
        computeCurrMoveAmtSq(data.distSq);
		updateDots(data.dots);
	}

	const updatedAt = useStoreState(state => state.updatedAt);
	const updatePrev = useRef();
	
	useEffect(() => {
		if (updatePrev.current === undefined || updatePrev.current !== updatedAt) {
			updatePrev.current = updatedAt;
		}
	},[])

	useEffect(() => {
		if (!animOn ) { startAnim(); }
	},[])

	return (
		animOn ? 
		<Animator 
		  effect={animate}
		/> 
		: null
	)
}

const DotMaker2 = () => {
	const sets = useStoreState(state => state.dotSets);
	const initialize = useStoreActions(actions => actions.initDotData);
	const reset = useStoreActions(actions => actions.reset);
	const init = useStoreState(state => state.init);
	const nextIdx = useStoreState(state => state.nextIdx);
	const updateNextIdx = useStoreActions(actions => actions.updateNextIdx);
	console.log('dm2rendrs');

	const firstMake = () => {
		let lastIdx = nextIdx;
		let dots = [];
		sets.forEach((s,i) => {
			let set = makeDotData(s.qty,i,lastIdx);
			set = set.map(dot => findNs(dot,set));
			set = set.map(dot => setTargets(dot,set));
			set = set.map(dot => chooseStrategy(dot));
			dots = dots.concat(set);
			if (lastIdx !== 0) {
				lastIdx = lastIdx + dots.length;
			} else {
				lastIdx = dots.length - 1;
			}
		});
		initialize(dots);
		updateNextIdx(lastIdx);
	}

	useEffect(() => {
		firstMake();
		return reset;
	}, [])
			

	return (
		init ? <DataHandler /> : null
		)
}

export default function App () {

	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">SMATTER_art</h1>
			</header>
			<DotMaker2 />
			<Container />
		</div>
	);
}