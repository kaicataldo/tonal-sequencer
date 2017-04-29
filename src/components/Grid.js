import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRow: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.isPlaying === prevProps.isPlaying) {
      return;
    }
    this.props.isPlaying ? this._startPlaying() : this._stopPlaying();
  }

  render() {
    return (
      <div>
        {this.props.grid.map((rowData, colIdx) => (
          <div className='row' key={colIdx}>
            {rowData.map(({ isSelected }, rowIdx) => (
              <Square
                key={rowIdx}
                isActive={this.props.isPlaying && colIdx === this.state.activeRow}
                isSelected={isSelected}
                coords={[colIdx, rowIdx]}
                toggleSquare={this.props.toggleSquare}
                sound={this.props.sound}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  _startPlaying() {
    this.intervalID = window.setInterval(() => this._tick(), this._getTempoInMs());
  }

  _stopPlaying() {
    window.clearInterval(this.intervalID);
    delete this.intervalID;
    this.setState({
      activeRow: 0
    });
  }

  _tick() {
    const maxLen = this.props.grid.length - 1;
    this.setState({
      activeRow: this.state.activeRow === maxLen ? 0 : this.state.activeRow + 1
    });
  }

  _getTempoInMs() {
    return Math.round((60000 / this.props.tempo) / 4);
  }
}

Grid.propTypes = {
  grid: PropTypes.array,
  isPlaying: PropTypes.bool,
  tempo: PropTypes.number,
  toggleSquare: PropTypes.func,
  sound: PropTypes.object
};
