import React, { Component } from 'react';
import './LayerPanel.css';

export default class DotQtyChooser extends Component {

  constructor(props) {
    super(props);
    this.layer = this.props.layerNum;
    this.state = {
      value: this.props.dotQty
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    }, this.props.data.updateDotQty(event.target.value,this.layer));
  }

  render() {
    return (
      <form className="DotQtyChooser">
        <label>Dot Qty: </label>
        <input value={this.state.value} onChange={this.handleChange} >
        </input>
        <label> * 2</label>
      </form>
    )
  }
}
