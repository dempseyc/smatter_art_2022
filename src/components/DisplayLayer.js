import { useRef, useEffect } from 'react'
import { useStoreState } from 'easy-peasy';
import Dot from './Dot'

export default function DisplayLayer (props) {
	const dots = useStoreState( state => state.dotData );
	const updatedAt = useStoreState( state => state.updatedAt);
	const prevUpdate = useRef()

	let makeDots = function (updatedAt) {
		return dots.map(function (d,i) {
			return (
				<Dot
				key={`d-${i}`}
				size={3}
				color='black'
				dot={d}
				/>
				)
			})
		}
		
	let display = () => makeDots(updatedAt)

	useEffect(() => {
		if (prevUpdate.current !== updatedAt) {
			display = makeDots(updatedAt);
			prevUpdate.current = updatedAt;
		}
	},[updatedAt])
		
	return (
		<div className="DisplayLayer">
		{display()}
		</div>
	)
}