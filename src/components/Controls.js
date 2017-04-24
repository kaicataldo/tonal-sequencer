import React from 'react';
import PropTypes from 'prop-types';

export default function Controls({ isPlaying, onClearClick, onStartClick, sound, onChangeWaveType }) {
  const { type } = sound;

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
  isPlaying: PropTypes.bool,
  onClearClick: PropTypes.func,
  onStartClick: PropTypes.func,
  onChangeWaveType: PropTypes.func,
  sound: PropTypes.object
}
