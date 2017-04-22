import React, { Component } from 'react';
import Sound from '../lib/Sound';
import { getNoteFreq } from '../lib/utils/sound';

export default class Square extends Component {
  constructor(props) {
    super(props);
    const { type, scale } = props;
    const [, rowIdx] = props.coords;
    this.sound = new Sound(type, getNoteFreq(scale, rowIdx));
  }

  componentWillUpdate(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.sound = new Sound(nextProps.type, getNoteFreq(this.props.scale, this.props.coords[1]));
    }
  }

  componentDidUpdate() {
    if (this.props.isActive && this.props.isSelected && !this.sound.isPlaying) {
      this.sound.start();
    } else if (this.sound.isPlaying) {
      this.sound.stop();
    }
  }

  getSquareClasses() {
    const { isActive, isSelected } = this.props;
    return `square${isActive ? ' active' : ''}${isSelected ? ' selected' : ''}`;
  }

  render() {
    return (
      <div
        onClick={() => this.props.toggleSquare(this.props.coords)}
        className={this.getSquareClasses()}
      />
    );
  }
}

Square.propTypes = {
  isActive: React.PropTypes.bool,
  isSelected: React.PropTypes.bool,
  coords: React.PropTypes.array,
  toggleSquare: React.PropTypes.func,
  type: React.PropTypes.string,
  scale: React.PropTypes.string
};
