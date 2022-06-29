import { useStoreState } from 'easy-peasy';
import { $pallette_1 } from '../dotStyles';
import Dot from './Dot2'

export default function DisplayLayer ({layerNum}) {
	const dotsBySet = useStoreState( state => state.dotsBySet[layerNum] );
	const setData = useStoreState( state => state.dotSets[layerNum] );
	const dlSize = '100px';
	
	let viewBox = `0 0 100 100`;

	let makeDots = function (dots) {
		console.log('dl makedots');
		return dots.map(function (d,i) {
			return (
				<Dot
					key={`d-${i}`}
					size={setData.size}
					color={$pallette_1[setData.color]}
					dot={d} //not needed in prod
					id={d.id}
					index={d.index}
				/>
				)
			})
	}
		
	return (
		<div className="DisplayLayer">
			<svg
			x={0} 
			y={0}
			// width={dlSize}
			// height={dlSize} 
			viewBox={viewBox}
			xmlns="http://www.w3.org/2000/svg"
			>
				{makeDots(dotsBySet)}
			</svg>
		</div>
	)
}