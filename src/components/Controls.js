import React from 'react';

export default function Controls({ isPlaying, onClearClick, onStartClick }) {
  return (
    <div>
      <button onClick={onStartClick}>
        {isPlaying ? 'Stop' : 'Start'}
      </button>
      <button onClick={onClearClick}>
        Clear
      </button>
    </div>
  );
}

Controls.propTypes = {
  isPlaying: React.PropTypes.bool,
  onClearClick: React.PropTypes.func,
  onStartClick: React.PropTypes.func
}
