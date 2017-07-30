// @flow

import React from "react";
import { waveTypes } from "../lib/sound-utils";

export default function Controls({
  isPlaying,
  onClearClick,
  onStartClick,
  onControlChange,
  type,
  tempo
}: {
  isPlaying: boolean,
  onClearClick: Function,
  onStartClick: Function,
  onControlChange: Function,
  type: WaveType,
  tempo: number
}) {
  return (
    <div>
      <button onClick={onStartClick}>
        {isPlaying ? "Stop" : "Start"}
      </button>
      <button onClick={onClearClick}>Clear</button>
      <div>
        <label htmlFor="type">Type</label>
        <select
          name="type"
          value={type}
          onChange={(...args) => onControlChange("type", ...args)}
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
        <label htmlFor="tempo">
          Tempo: {tempo}
        </label>
        <input
          value={tempo}
          name="tempo"
          type="range"
          min="1"
          max="250"
          step="1"
          onChange={(...args) => onControlChange("tempo", ...args)}
        />
      </div>
    </div>
  );
}
