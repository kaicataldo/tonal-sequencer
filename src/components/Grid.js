import React, { Component } from 'react';
import Column from './Column';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRow: 0,
      tempo: 120
    };
  }

  componentDidUpdate() {
    this.togglePlay(this.props.isPlaying);
  }

  togglePlay(isPlaying) {
    if (isPlaying && !this.intervalID) {
      this.intervalID = window.setInterval(() => this.tick(), this.getTempo());
    } else if (!isPlaying && this.intervalID) {
      window.clearInterval(this.intervalID);
      delete this.intervalID;
      this.setState({
        activeRow: 0
      });
    }
  }

  tick() {
    const maxLen = this.props.gridData.length;
    this.setState({
      activeRow: this.state.activeRow === maxLen ? 0 : this.state.activeRow + 1
    });
  }

  getTempo() {
    return Math.round((60000 / this.state.tempo) / 4);
  }

  render() {
    const { gridData, isPlaying, toggleSquare } = this.props;
    return (
      <div>
        {gridData.map((rowData, index) => (
          <Column
            rowData={rowData}
            index={index}
            key={index}
            isActive={isPlaying && index === this.state.activeRow}
            toggleSquare={toggleSquare}
          />
        ))}
      </div>
    );
  }
}

Grid.propTypes = {
  gridData: React.PropTypes.array,
  isPlaying: React.PropTypes.bool,
  toggleSquare: React.PropTypes.func
};
