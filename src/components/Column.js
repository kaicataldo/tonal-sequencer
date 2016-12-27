import React from 'react';
import Square from './Square';

export default function Column({ isActive, rowData, index, toggleSquare }) {
  return (
    <div className="row">
      {rowData.map(({ isSelected }, squareIndex) => (
        <Square
          isSelected={isSelected}
          isActive={isActive}
          key={squareIndex}
          coords={[index, squareIndex]}
          toggleSquare={toggleSquare}
        />
      ))}
    </div>
  );
}

Column.propTypes = {
  isActive: React.PropTypes.bool,
  rowData: React.PropTypes.array,
  index: React.PropTypes.number,
  toggleSquare: React.PropTypes.func
};
