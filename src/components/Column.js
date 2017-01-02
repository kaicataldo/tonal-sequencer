import React from 'react';
import noteParser from 'note-parser';
import Square from './Square';
import { noteMap } from '../Sound';

function getNoteFreq(index) {
  return noteParser.parse(noteMap[index]).freq;
}

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
          freq={getNoteFreq(squareIndex)}
          type="triangle"
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
