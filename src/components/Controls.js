import React from 'react';
import PropTypes from 'prop-types';

export default function Controls({ isPlaying, onClearClick, onStartClick, tempo, type, onControlChange }) {
  return (
    <div>
      <button onClick={onStartClick}>
        {isPlaying ? 'Stop' : 'Start'}
      </button>
      <button onClick={onClearClick}>
        Clear
      </button>
      <label htmlFor='type'>Type</label>
      <select name='type' value={type} onChange={(...args) => onControlChange('type', ...args)}>
        {['sine', 'sawtooth', 'square', 'triangle'].map((type, i) => {
          return (
            <option key={i} value={type}>
              {type}
            </option>
          );
        })}
      </select>
      <label htmlFor='tempo'>Tempo: {tempo}</label>
      <input
        value={tempo}
        name='tempo'
        type='range'
        min='1'
        max='250'
        step='1'
        onChange={(...args) => onControlChange('tempo', ...args)}
        ></input>
    </div>
  );
}

Controls.propTypes = {
  isPlaying: PropTypes.bool,
  onClearClick: PropTypes.func,
  onStartClick: PropTypes.func,
  onControlChange: PropTypes.func,
  type: PropTypes.string,
  tempo: PropTypes.number
};
