import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sound from '../lib/Sound';
import { getNoteFreq } from '../lib/utils/sound';

export default class Square extends Component {
  constructor(props) {
    super(props);
    const { sound: { type, scale } } = props;
    const [, rowIdx] = props.coords;
    this.sound = new Sound({
      type,
      freq: getNoteFreq(scale, rowIdx)
    });
  }

  componentWillUpdate(nextProps) {
    if (this.props.sound.type !== nextProps.sound.type) {
      this.sound.setState({
        type: nextProps.sound.type,
        freq: getNoteFreq(this.props.sound.scale, this.props.coords[1])
      });
    }
  }

  componentDidUpdate() {
    if (this.props.isActive && this.props.isSelected && !this.sound.isPlaying()) {
      this.sound.start();
    } else if (this.sound.isPlaying()) {
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
  isActive: PropTypes.bool,
  isSelected: PropTypes.bool,
  coords: PropTypes.array,
  toggleSquare: PropTypes.func,
  sound: PropTypes.object
};
