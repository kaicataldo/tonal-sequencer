import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sound from '../lib/Sound';

export default class Square extends Component {
  constructor(props) {
    super(props);
    const { type, scale } = props;
    const [, rowIdx] = props.coords;
    this.sound = new Sound({ type, scale, index: rowIdx });
  }

  componentWillUpdate(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.sound.update({
        type: nextProps.type,
        scale: this.props.scale,
        index: this.props.coords[1]
      });
    }
  }

  componentDidUpdate() {
    if (this.props.isActive && this.props.isSelected && !this.sound.isPlaying) {
      this.sound.start();
    } else if (this.sound.isPlaying) {
      this.sound.stop();
    }
  }

  render() {
    return (
      <div
        onClick={() => this.props.toggleSquare(this.props.coords)}
        className={this._getSquareClasses()}
      />
    );
  }

  _getSquareClasses() {
    const { isActive, isSelected } = this.props;
    return `square${isActive ? ' active' : ''}${isSelected ? ' selected' : ''}`;
  }
}

Square.propTypes = {
  isActive: PropTypes.bool,
  isSelected: PropTypes.bool,
  coords: PropTypes.array,
  type: PropTypes.string,
  scale: PropTypes.string,
  toggleSquare: PropTypes.func
};
