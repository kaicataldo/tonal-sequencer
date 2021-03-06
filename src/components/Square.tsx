import React from 'react';

interface SquareProps {
  isActive: boolean;
  isSelected: boolean;
  coords: number[];
  toggleSquare: (coords: number[]) => void;
}

export default function Square(props: SquareProps): JSX.Element {
  function getSquareClasses(): string {
    const { isActive, isSelected } = props;
    return `square${isActive ? ' active' : ''}${isSelected ? ' selected' : ''}`;
  }

  function getBackgroundColor() {
    const { isActive, isSelected } = props;
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

  return (
    <div
      onClick={() => props.toggleSquare(props.coords)}
      className={getSquareClasses()}
      style={{
        border: 'solid 1px black',
        height: '24px',
        width: '24px',
        background: getBackgroundColor(),
      }}
    />
  );
}
