import React, { Component } from 'react'

export default class LayerButton extends Component {

    constructor(props) {
        super(props);

        this.state= {
            amActive: this.props.reportActiveLayer(this.props.layerNum)
        }
        
    }

    componentWillReceiveProps() {
        this.setState({
            amActive: this.props.reportActiveLayer(this.props.layerNum)
        })
    }

    render() {
        let classnames = `LayerButton-${this.props.layerNum} active-${this.state.amActive}`;
        return (
            <button className={classnames} onClick={this.props.handleClick}>
                <p>{this.props.layerNum}</p>
            </button>
        )
    }
}