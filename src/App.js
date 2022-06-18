import { useState, useRef, useEffect } from 'react'

import './CSSreset.css';
import './App.scss';

import { makeDotData, findNs } from './DotSetup'
import { setTargets, chooseStrategy, trackAnim } from './DotMover'

import { useStoreState, useStoreActions } from 'easy-peasy';

import Container from './components/Container';
import Animator from './Animator';

const DataHandler = () => {
	let dots = useStoreState(state => state.dotData);
	const minMove = 1/dots.length

	const currMoveAmtSq = useRef();
	const animOn = useRef()
    const updateDots = useStoreActions(actions => actions.updateDotData);

	const stopAnim = () => {
		animOn.current = false;
		console.log('stopped');
	}

	const computeCurrMoveAmtSq = (val) => {
        if (currMoveAmtSq.current != undefined) {
            if (currMoveAmtSq.current <= minMove) {
                // currMoveAmtSq.current = 0;
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
        // updateDots(JSON.parse(JSON.stringify(data.dots))); // dont do
		updateDots(data.dots);
	}

	const startAnim = () => {
		animOn.current = true;
	}
	const updatedAt = useStoreState(state => state.updatedAt);
	const updatePrev = useRef();
	
	useEffect(() => {
		if (updatePrev.current === undefined || updatePrev.current !== updatedAt) {
			updatePrev.current = updatedAt;
			if (!animOn.current ) { startAnim(); }
		}
	},[updatedAt, animOn])

	return (
		animOn.current ? 
		<Animator 
		  effect={animate}
		/> 
		: null
	)
}

const DotMaker = () => {
	const init = useStoreActions(actions => actions.initDotData);
	const reset = useStoreActions(actions => actions.reset);

	useEffect(() => {
		let dots = makeDotData(400,0,0);
			dots = dots.map(dot => findNs(dot,dots));
			dots = dots.map(dot => setTargets(dot,dots));
			dots = dots.map(dot => chooseStrategy(dot));
			init(dots);
		return reset;
		
	}, [])
	return (<DataHandler />)
}

export default function App () {
	
	// let dots = useStoreState(state => state.dotData);
	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">SMATTER_art</h1>
			</header>
			<DotMaker />
			<Container />
		</div>
	);
}