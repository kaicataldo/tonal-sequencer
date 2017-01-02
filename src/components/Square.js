import React, { Component } from 'react';
import Sound from '../Sound';

export default class Square extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.sound = new Sound(props.type, props.freq);
  }

  componentDidUpdate() {
    if (this.props.isActive && this.props.isSelected && !this.sound.isPlaying) {
      this.sound.start();
    } else if (this.sound.isPlaying) {
      this.sound.stop();
    }
  }

  handleClick() {
    this.props.toggleSquare(this.props.coords);
  }

  getSquareClasses() {
    const { isActive, isSelected } = this.props;
    return `square${isActive ? ' active' : ''}${isSelected ? ' selected' : ''}`;
  }

  render() {
    return <div onClick={this.handleClick} className={this.getSquareClasses()} />;
  }
}

Square.propTypes = {
  isActive: React.PropTypes.bool,
  isSelected: React.PropTypes.bool,
  coords: React.PropTypes.array,
  toggleSquare: React.PropTypes.func,
  freq: React.PropTypes.number,
  type: React.PropTypes.string
};
