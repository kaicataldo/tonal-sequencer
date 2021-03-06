import React, { Component } from 'react';
import Square from './Square';

interface GridProps {
  isPlaying: boolean;
  toggleSquare: ([col, row]: [number, number]) => void;
  grid: { isSelected: boolean }[][];
  tempo: number;
  type: OscillatorType;
  scale: string;
}

export default class Grid extends Component<GridProps> {
  state = { activeRow: 0 };
  intervalID = null;

  private startPlaying(): void {
    this.intervalID = window.setInterval(
      () => this.tick(),
      this.getTempoInMs()
    );
  }

  private clearInterval(): void {
    window.clearInterval(this.intervalID);
    this.intervalID = null;
  }

  private stopPlaying(): void {
    this.clearInterval();
    this.setState({
      activeRow: 0,
    });
  }

  private updateTempo(): void {
    this.clearInterval();
    if (this.props.isPlaying) {
      this.startPlaying();
    }
  }

  private tick(): void {
    const maxLen = this.props.grid.length - 1;
    this.setState({
      activeRow: this.state.activeRow === maxLen ? 0 : this.state.activeRow + 1,
    });
  }

  private getTempoInMs(): number {
    return Math.round(60000 / this.props.tempo / 4);
  }

  componentDidUpdate(prevProps: GridProps): void {
    if (this.props.tempo !== prevProps.tempo) {
      this.updateTempo();
    }
    if (this.props.isPlaying === prevProps.isPlaying) {
      return;
    }
    this.props.isPlaying ? this.startPlaying() : this.stopPlaying();
  }

  render(): JSX.Element {
    return (
      <div>
        {this.props.grid.map((rowData, colIdx) => (
          <div className="row" style={{ display: 'inline-block' }} key={colIdx}>
            {rowData.map(({ isSelected }, rowIdx) => (
              <Square
                key={rowIdx}
                isActive={
                  this.props.isPlaying && colIdx === this.state.activeRow
                }
                isSelected={isSelected}
                coords={[colIdx, rowIdx]}
                toggleSquare={this.props.toggleSquare}
                type={this.props.type}
                scale={this.props.scale}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
