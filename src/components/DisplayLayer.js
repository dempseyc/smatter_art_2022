import { useStoreState } from 'easy-peasy';
import { $pallette_1, $pallette_2, $pallette_3, $pallette_4 } from '../dotStyles';
import Dot from './Dot2'

export default function DisplayLayer ({layerNum}) {
	const setData = useStoreState( state => state.dotSets[layerNum] );
	const dotsBySet = useStoreState( state => state.dotsBySet[setData.id]);
	const colors = $pallette_4;
	const color = colors[setData.color]
	const color2 = colors[setData.color2]
	
	let viewBox = `0 0 100 100`;

	let makeDots = function (dots) {
		return dots.map(function (d,i) {
			return (
				<Dot
					key={`d-${i}`}
					size={setData.size}
					color={color}
					color2={color2}
					dot={d} //not needed in prod
					id={d.id}
					index={d.index}
					style={setData.style}
				/>
				)
			})
	}
	
	return (
		<div className="DisplayLayer">
			<svg
			x={0} 
			y={0}
			viewBox={viewBox}
			xmlns="http://www.w3.org/2000/svg"
			>
				{/* {(layerNum === last) ? <rect width="100" height="100" color="rgb(220,220,220)"/> : null} */}
				{makeDots(dotsBySet)}
			</svg>
		</div>
	)
}