import React, { Component } from 'react';
import './LayerPanel.css';

export default class DotAlgoChooser extends Component {

  constructor(props) {
    super(props);
    this.layer = this.props.layerNum;
    this.state = {
      value: 'random'
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    }, this.props.data.updateAlgo(event.target.value,this.layer));
  }

  render() {
    return (

      <form className="DotAlgoChooser">
        <label>Algorithm</label>
        <select value={this.state.value} onChange={this.handleChange} >
          <option value='midpoint'>Midpoint</option>
          <option value='orthogonal'>Orthogonal</option>
          {/* <option default value='random'>Random</option> */}
          <option default value='average'>Average</option>
          <option default value='center'>Center</option>
        </select>
      </form>
    )
  }
}