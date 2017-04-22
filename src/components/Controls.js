import React from 'react';

export default function Controls({ isPlaying, onClearClick, onStartClick, type, onChangeWaveType }) {
  return (
    <div>
      <button onClick={onStartClick}>
        {isPlaying ? 'Stop' : 'Start'}
      </button>
      <button onClick={onClearClick}>
        Clear
      </button>
      <select value={type} onChange={onChangeWaveType}>
        {['sine', 'sawtooth', 'square', 'triangle'].map((type, i) => {
          return (
            <option key={i} value={type}>
              {type}
            </option>
          );
        })}
      </select>
    </div>
  );
}

Controls.propTypes = {
  isPlaying: React.PropTypes.bool,
  onClearClick: React.PropTypes.func,
  onStartClick: React.PropTypes.func,
  onChangeWaveType: React.PropTypes.func,
  type: React.PropTypes.string
}
