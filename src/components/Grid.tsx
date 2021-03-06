import React from 'react';
import Square from './Square';

interface GridProps {
  isPlaying: boolean;
  activeRow: number;
  toggleSquare: ([col, row]: [number, number]) => void;
  grid: { isSelected: boolean }[][];
}

export default function Grid(props: GridProps): JSX.Element {
  return (
    <div>
      {props.grid.map((rowData, colIdx) => (
        <div className="row" style={{ display: 'inline-block' }} key={colIdx}>
          {rowData.map(({ isSelected }, rowIdx) => (
            <Square
              key={rowIdx}
              isActive={props.isPlaying && colIdx === props.activeRow}
              isSelected={isSelected}
              coords={[colIdx, rowIdx]}
              toggleSquare={props.toggleSquare}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
