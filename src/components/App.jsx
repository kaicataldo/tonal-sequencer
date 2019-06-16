// @flow

import React, { Component } from 'react';
import Grid from './Grid';
import Controls from './Controls';

export default class App extends Component {
  state = {
    isPlaying: false,
    cols: 16,
    rows: 16,
    tempo: 120,
    type: 'sine',
    scale: 'pentatonic',
    grid: this._generateNewGridData()
  };

  resetSquares = () => {
    this.setState({ grid: this._generateNewGridData() });
  };

  togglePlay = () => {
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  toggleSquare = ([col, row]: [number, number]) => {
    const grid = this.state.grid.slice();
    grid[col][row].isSelected = !grid[col][row].isSelected;
    this.setState({ grid });
  };

  controlChangeHandler = (
    type: string,
    event: Event & { currentTarget: HTMLSelectElement }
  ) => {
    let val = event.currentTarget.value;

    if (type === 'tempo') {
      val = Number(val);
    }
    this.setState({
      ...this.state,
      [type]: val
    });
  };

  _generateNewGridData(): Array<Array<{ isSelected: boolean }>> {
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

  componentWillMount() {
    this.setState({ grid: this._generateNewGridData() });
  }

  render() {
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
          scale={this.state.scale}
          tempo={this.state.tempo}
          onControlChange={this.controlChangeHandler}
        />
      </div>
    );
  }
}
