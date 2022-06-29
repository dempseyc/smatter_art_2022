import { useStoreState } from 'easy-peasy';
import { $pallette_1, $pallette_2 } from '../dotStyles';
import Dot from './Dot2'

export default function DisplayLayer ({layerNum}) {
	const dotsBySet = useStoreState( state => state.dotsBySet[layerNum] );
	const setData = useStoreState( state => state.dotSets[layerNum] );
	
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

	let makeDotChildren = function (dots) {
		console.log('dl makedots');
		return dots.map(function (d,i) {
			return (
				<Dot
					key={`dc-${i}`}
					size={setData.size*setData.childShrink}
					color={$pallette_2[setData.childColor]}
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
				{makeDotChildren(dotsBySet)}
			</svg>
		</div>
	)
}