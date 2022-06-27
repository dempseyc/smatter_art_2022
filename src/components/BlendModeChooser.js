import React, { Component } from 'react';
import './Editor.scss';

export default class BlendModeChooser extends Component {

  constructor(props) {
    super(props);
    this.layer = this.props.layerNum;
    this.state = {
      expanded: false,
      blendMode: this.props.data.layers[this.layer-1].blendMode
    }
    this.blendModes = this.props.blendModes;
    this.makeButtons = this.makeButtons.bind(this);
    this.changeBlendMode = this.changeBlendMode.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  makeButtons (blendModes) {
    let choiceStatus = "expanded";
    return blendModes.map( (blendMode, i) => {
      if (this.state.expanded===true) {
        choiceStatus = "expanded";
      } else if (this.state.blendMode===blendMode) {
        choiceStatus = "am-chosen";
      } else {
        choiceStatus = "am-not-chosen";
      }
      let classnames = `style-button ${choiceStatus}`;

      let CSSstyle = {backgroundImage: `url(images/${blendMode}.png)`};

      return (<button 
        key={`mode-${i}`} 
        style={CSSstyle} 
        className={classnames}
        onClick={ () => { 
          if(choiceStatus !== "expanded") {
            return;
          } else {
            this.changeBlendMode(blendMode,this.layer);
          }
        }}
      >{blendMode}</button>)
    })
  }

  changeBlendMode(mode,layer) {
    this.setState({
      blendMode: mode
    }, this.props.data.updateBlendMode(mode,layer) )
  }

  handleClick() {
    if(this.state.expanded===true) {
      this.setState({
        expanded: false
      })
    } else {
      this.setState({
        expanded: true
      })
    }
  }

  render() {
    return (
      <div 
        className="BlendModeChooser"
        onClick={this.handleClick}
        >
        { this.makeButtons(this.blendModes) }
      </div>
    )
  }
}