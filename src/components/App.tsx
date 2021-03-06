import React, { Component } from 'react';
import Grid from './Grid';
import Controls from './Controls';

interface AppState {
  isPlaying: boolean;
  cols: number;
  rows: number;
  tempo: number;
  type: OscillatorType;
  scale: string;
  grid: { isSelected: boolean }[][];
}

export default class App extends Component<Record<string, unknown>, AppState> {
  state: AppState = {
    isPlaying: false,
    cols: 16,
    rows: 16,
    tempo: 120,
    type: 'sine',
    scale: 'pentatonic',
    grid: this.generateNewGridData(),
  };

  private resetSquares = (): void => {
    this.setState({ grid: this.generateNewGridData() });
  };

  private togglePlay = (): void => {
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  private toggleSquare = ([col, row]: [number, number]): void => {
    const grid = this.state.grid.slice();
    grid[col][row].isSelected = !grid[col][row].isSelected;
    this.setState({ grid });
  };

  private controlChangeHandler = (type, event) => {
    let val = event.currentTarget.value;

    if (type === 'tempo') {
      val = Number(val);
    }
    this.setState({
      ...this.state,
      [type]: val,
    });
  };

  private generateNewGridData() {
    const cols = (this.state && this.state.cols) || 16;
    const rows = (this.state && this.state.rows) || 16;
    const state = [];

    for (let i = 0; i < cols; i++) {
      const col = [];
      for (let j = 0; j < rows; j++) {
        col.push({ isSelected: false });
      }
      state[i] = col;
    }
    return state;
  }

  UNSAFE_componentWillMount(): void {
    this.setState({ grid: this.generateNewGridData() });
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Tonal Grid</h1>
        <Grid
          grid={this.state.grid}
          type={this.state.type}
          scale={this.state.scale}
          tempo={this.state.tempo}
          isPlaying={this.state.isPlaying}
          toggleSquare={this.toggleSquare}
        />
        <Controls
          isPlaying={this.state.isPlaying}
          onClearClick={this.resetSquares}
          onStartClick={this.togglePlay}
          type={this.state.type}
          tempo={this.state.tempo}
          onControlChange={this.controlChangeHandler}
        />
      </div>
    );
  }
}
