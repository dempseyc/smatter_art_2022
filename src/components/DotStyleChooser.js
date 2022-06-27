import React, { Component } from 'react';
import './Editor.scss';

export default class DotStyleChooser extends Component {

  constructor(props) {
    super(props);
    this.layer = this.props.layerNum;
    this.state = {
      expanded: false,
      dotStyle: this.props.data.layers[this.layer-1].dotStyle
    }
    this.dotStyles = this.props.styleRange;
    this.makeButtons = this.makeButtons.bind(this);
    this.changeDotStyle = this.changeDotStyle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  makeButtons (dotStyles) {
    let choiceStatus = "expanded";
    return dotStyles.map( (dotStyle, i) => {
      if (this.state.expanded===true) {
        choiceStatus = "expanded";
      } else if (this.state.dotStyle===dotStyle) {
        choiceStatus = "am-chosen";
      } else {
        choiceStatus = "am-not-chosen";
      }
      let classnames = `style-button ${choiceStatus}`;
      let CSSstyle = {backgroundImage: `url(images/${dotStyle}.png)`};

      return (<button 
        key={i} 
        style={CSSstyle} 
        className={classnames}
        onClick={ () => { 
          if(choiceStatus !== "expanded") {
            return;
          } else {
            this.changeDotStyle(dotStyle,this.layer);
          }
        }}
      >{dotStyle}</button>)
    })
  }

  changeDotStyle(style,layer) {
    // from update props.data up to container
    this.setState({
      dotStyle: style
    }, this.props.data.updateDotStyle(style,layer) )
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
        className="DotStyleChooser"
        onClick={this.handleClick}
        >
        { this.makeButtons(this.dotStyles) }
      </div>
    )
  }
}