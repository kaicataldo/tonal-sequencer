import React, { Component } from "react";
import PropTypes from "prop-types";
import Sound from "../lib/Sound";

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
        style={{
          border: "solid 1px black",
          height: "24px",
          width: "24px",
          background: this._getBackgroundColor()
        }}
      />
    );
  }

  _getSquareClasses() {
    const { isActive, isSelected } = this.props;
    return `square${isActive ? " active" : ""}${isSelected ? " selected" : ""}`;
  }

  _getBackgroundColor() {
    const { isActive, isSelected } = this.props;
    if (isActive && isSelected) {
      return "yellow";
    } else if (isActive) {
      return "blue";
    } else if (isSelected) {
      return "red";
    } else {
      return "";
    }
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
