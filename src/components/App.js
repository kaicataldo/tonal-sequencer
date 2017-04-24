import React, { Component } from 'react';
import Grid from './Grid';
import Controls from './Controls';
import { generateNewGridData, generateInitialGridState } from '../lib/utils/grid';

export default class App extends Component {
  constructor(props) {
    super(props);
    // TODO: State can be saved to/loaded from localStorage.
    this.state = generateInitialGridState();
    this.resetSquares = this.resetSquares.bind(this);
    this.toggleSquare = this.toggleSquare.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.setWaveType = this.setWaveType.bind(this);
  }

  resetSquares() {
    this.setState({
      grid: generateNewGridData(this.state.cols, this.state.rows)
    });
  }

  togglePlay() {
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }

  setWaveType(event) {
    this.setState({
      sound: {
        ...this.state.sound,
        type: event.target.value
      }
    });
  }

  toggleSquare([col, row]) {
    const grid = this.state.grid.slice();
    grid[col][row].isSelected = !grid[col][row].isSelected;
    this.setState({ grid });
  }

  render() {
    return (
      <div>
        <h1>Tonal Grid</h1>
        <Grid
          grid={this.state.grid}
          sound={this.state.sound}
          tempo={this.state.tempo}
          isPlaying={this.state.isPlaying}
          toggleSquare={this.toggleSquare}
        />
        <Controls
          isPlaying={this.state.isPlaying}
          onClearClick={this.resetSquares}
          onStartClick={this.togglePlay}
          sound={this.state.sound}
          onChangeWaveType={this.setWaveType}
        />
      </div>
    );
  }
}
