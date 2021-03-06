import React from 'react';
import { waveTypes } from '../lib/sound-utils';

interface ControlsProps {
  isPlaying: boolean;
  onClearClick: () => void;
  onStartClick: () => void;
  onControlChange: (type: string, value: string | number) => void;
  type: OscillatorType;
  tempo: number;
}

export default function Controls({
  isPlaying,
  onClearClick,
  onStartClick,
  onControlChange,
  type,
  tempo,
}: ControlsProps): JSX.Element {
  return (
    <div>
      <button onClick={onStartClick}>{isPlaying ? 'Stop' : 'Start'}</button>
      <button onClick={onClearClick}>Clear</button>
      <div>
        <label htmlFor="type">Type</label>
        <select
          name="type"
          value={type}
          onChange={(event) =>
            onControlChange('type', event.currentTarget.value)
          }
        >
          {waveTypes.map((type, i) => {
            return (
              <option key={i} value={type}>
                {type}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor="tempo">Tempo: {tempo}</label>
        <input
          value={tempo}
          name="tempo"
          type="range"
          min="1"
          max="250"
          step="1"
          onChange={(event) =>
            onControlChange('tempo', Number(event.currentTarget.value))
          }
        />
      </div>
    </div>
  );
}
