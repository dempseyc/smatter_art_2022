import { useState, useRef, useEffect } from 'react'

import './CSSreset.css';
import './App.scss';

import { makeDotData, findNs } from './DotSetup'
import { setTargets, chooseStrategy, trackAnim } from './DotMover'

import { useStoreState, useStoreActions } from 'easy-peasy';

import Container from './components/Container';
import Animator from './Animator';


export default function App () {

	const currMoveAmtSq = useRef();
	const animOn = useRef()
    const updateDots = useStoreActions(actions => actions.updateDotData);
	const stopAnim = () => {
		animOn.current = false;
		console.log('stopped');
	}

	const computeCurrMoveAmtSq = (val) => {
        if (currMoveAmtSq.current != undefined) {
            if (currMoveAmtSq.current <= 5) {
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
		console.log(data.distSq);
        updateDots(data.dots);
	}

	const animator = () => {
		return (
			animOn.current ? 
			<Animator 
			  effect={animate}
			/> 
			: null
		)
	}
	const startAnim = () => {
		animOn.current = true;
	}
	const updatedAt = useStoreState(state => state.updatedAt);
	const updatePrev = useRef();
	
	useEffect(() => {
		if (updatePrev.current !== updatedAt) {
			updatePrev.current = updatedAt;
			if (!animOn.current ) { startAnim(); }
		}
	},[updatedAt, animOn])


	useStoreActions(actions => actions.updateDotData(makeDotData(10,0,0)));
	let dots = useStoreState(state => state.dotData);

	dots = dots.map(dot => findNs(dot,dots));
	// useStoreActions(actions => actions.updateDotData(dots));
	dots = dots.map(dot => setTargets(dot,dots));
	// useStoreActions(actions => actions.updateDotData(dots));
	dots = dots.map(dot => chooseStrategy(dot));
	// useStoreActions(actions => actions.updateDotData(dots));

	console.log(useStoreState(state => state.dotData));

	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">SMATTER_art</h1>
			</header>
			<Container />
			{animator()}
		</div>
	);
}