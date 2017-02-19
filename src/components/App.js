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
  }

  resetSquares() {
    this.setState({
      gridData: generateNewGridData(this.state.cols, this.state.rows)
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
          soundData={this.state.soundData}
          tempo={this.state.tempo}
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
