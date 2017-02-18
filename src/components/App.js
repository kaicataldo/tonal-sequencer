import React, { Component } from 'react';
import Grid from './Grid';
import Controls from './Controls';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      cols: 16,
      rows: 16,
      gridData: this.generateInitialGridState(16, 16)
    };
    this.resetSquares = this.resetSquares.bind(this);
    this.toggleSquare = this.toggleSquare.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  generateInitialGridState(cols = this.state.cols, rows = this.state.rows) {
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

  resetSquares() {
    this.setState({
      gridData: this.generateInitialGridState()
    });
  }

  togglePlay() {
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }

  toggleSquare([col, row]) {
    const gridData = this.state.gridData.slice();
    gridData[col][row].isSelected = !gridData[col][row].isSelected;
    this.setState({ gridData });
  }

  render() {
    return (
      <div>
        <h1>Tonal Grid</h1>
        <Grid
          gridData={this.state.gridData}
          isPlaying={this.state.isPlaying}
          toggleSquare={this.toggleSquare}
        />
        <Controls
          isPlaying={this.state.isPlaying}
          onClearClick={this.resetSquares}
          onStartClick={this.togglePlay}
        />
      </div>
    );
  }
}
