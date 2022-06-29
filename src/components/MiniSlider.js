import {useState, useEffect} from 'react';
import './Editor.scss';

// requires props {update, val, min, max, step, label}
const MiniSlider = (props) => {
    const [val, setVal] = useState(props.value);
    const {update, min, max, step, label, output} = props;

    const handleChange = (event) => {
        setVal( update(event.target.value) )
    };

    return (
        <div className="channel">
            <label className="mini-output">{label}: {output}</label>
            <input
                className="mini-input" 
                value={val}
                type="range" 
                min={min} 
                max={max} 
                step={step}
                onChange={handleChange}
            /> 
        </div>
    )
}

export default MiniSlider