import './CSSreset.css';
import './App.scss';

import { makeDotData, findNs } from './DotSetup'
import { setTargets, chooseStrategy} from './DotMover'

import { useStoreState, useStoreActions } from 'easy-peasy';

import Container from './components/Container';


export default function App () {

  useStoreActions( actions => actions.updateDotData(makeDotData(10,0,0)) );
  let dots = useStoreState( state => state.dotData );
  dots = dots.map( dot => findNs(dot,dots) );
  useStoreActions( actions => actions.updateDotData(dots) );
  dots = dots.map( dot => setTargets(dot,dots) );
  useStoreActions( actions => actions.updateDotData(dots) );
  dots = dots.map( dot => chooseStrategy(dot) );
  useStoreActions( actions => actions.updateDotData(dots) );


  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">SMATTER_art</h1>
      </header>
      <Container />
    </div>
  );
}