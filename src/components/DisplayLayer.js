import { useStoreState } from 'easy-peasy';
import Dot from './Dot'

export default function DisplayLayer (props) {
	const dotData = useStoreState( state => state.dotData );

	let makeDots = function (dots) {
		console.log('dl makedots');
		return dots.map(function (d,i) {
			return (
				<Dot
					key={`d-${i}`}
					size={1}
					color='black'
					dot={d}
					index={i}
				/>
				)
			})
	}
		
	return (
		<div className="DisplayLayer">
		{makeDots(dotData)}
		</div>
	)
}