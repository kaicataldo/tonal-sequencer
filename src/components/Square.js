// @flow

import React, { Component } from "react";
import Sound from "../lib/Sound";

type Props = {
  isActive: boolean,
  isSelected: boolean,
  coords: Array<number>,
  type: WaveType,
  scale: string,
  toggleSquare: Function
};

export default class Square extends Component {
  props: Props;

  sound = this._createNewSound();

  _createNewSound() {
    const { type, scale } = this.props;
    const [, rowIdx] = this.props.coords;
    return new Sound({ type, scale, index: rowIdx });
  }

  componentWillUpdate(nextProps: Props) {
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

  _getSquareClasses(): string {
    const { isActive, isSelected } = this.props;
    return `square${isActive ? " active" : ""}${isSelected ? " selected" : ""}`;
  }

  _getBackgroundColor(): string {
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
