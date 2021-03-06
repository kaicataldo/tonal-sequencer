import React, { Component } from 'react';
import Sound from '../lib/Sound';

interface SquareProps {
  isActive: boolean;
  isSelected: boolean;
  coords: number[];
  type: OscillatorType;
  scale: string;
  toggleSquare: (coords: number[]) => void;
}

export default class Square extends Component<SquareProps> {
  sound: Sound;

  constructor(props: SquareProps) {
    super(props);
    this.sound = this.createNewSound();
  }

  private createNewSound(): Sound {
    const { type, scale } = this.props;
    const [, rowIdx] = this.props.coords;
    return new Sound(type, scale, rowIdx);
  }

  private getSquareClasses(): string {
    const { isActive, isSelected } = this.props;
    return `square${isActive ? ' active' : ''}${isSelected ? ' selected' : ''}`;
  }

  private getBackgroundColor() {
    const { isActive, isSelected } = this.props;
    if (isActive && isSelected) {
      return 'yellow';
    } else if (isActive) {
      return 'blue';
    } else if (isSelected) {
      return 'red';
    } else {
      return '';
    }
  }

  UNSAFE_componentWillUpdate(nextProps: SquareProps): void {
    if (this.props.type !== nextProps.type) {
      this.sound.update({
        type: nextProps.type,
        scale: this.props.scale,
        index: this.props.coords[1],
      });
    }
  }

  componentDidUpdate(): void {
    if (
      this.props.isActive &&
      this.props.isSelected &&
      !this.sound.isPlaying()
    ) {
      this.sound.start();
    } else if (this.sound.isPlaying()) {
      this.sound.stop();
    }
  }

  render(): JSX.Element {
    return (
      <div
        onClick={() => this.props.toggleSquare(this.props.coords)}
        className={this.getSquareClasses()}
        style={{
          border: 'solid 1px black',
          height: '24px',
          width: '24px',
          background: this.getBackgroundColor(),
        }}
      />
    );
  }
}
