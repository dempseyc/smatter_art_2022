import {useState} from 'react';
import './Editor.scss';

const ExpandingChooser = (props) => {
  const {update, values, value, output, label} = props;

  const [expanded,setExpanded] = useState(false);
  const [choice, setChoice] =  useState(value);

  const changeChoice = (newChoice) => {
    if (newChoice !== value)
    setChoice(newChoice);
    update(newChoice);
    // setExpanded(false);
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  }

  const makeButtons = (values) => {
    let choiceStatus = "expanded"; // no make a sense
    return values.map( (v, i) => {
      if (expanded===true) {
        choiceStatus = "expanded";
      } else if (choice === v) {
        choiceStatus = "chosen";
      } else {
        choiceStatus = "not-chosen";
      }
      let classnames = `EC-button ${choiceStatus}`;

      return (<button 
        key={i} 
        className={classnames}
        onClick={ () => { 
          if(choiceStatus !== "expanded") {
            return;
          } else {
            changeChoice(v);
          }
        }}
      >{output(v)}</button>)
    })
  }

  return (
    <div
      className="ExpandingChooser">
      <div className="EC-label">{label}</div>
      <div 
        className="EC-choices"
        onClick={toggleExpanded}
        >
        { makeButtons(values) }
      </div>
    </div>
  )
}

export default ExpandingChooser