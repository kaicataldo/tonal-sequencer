import React, { useReducer } from 'react';
import Grid from './Grid';
import Controls from './Controls';

const ACTIONS = {
  RESET: 'RESET',
  TOGGLE_PLAYING: 'TOGGLE_PLAYING',
  TOGGLE_NOTE: 'TOGGLE_NOTE',
  CONTROL_CHANGE: 'CONTROL_CHANGE',
};

type GridState = { isSelected: boolean }[][];

interface AppState {
  isPlaying: boolean;
  cols: number;
  rows: number;
  tempo: number;
  type: OscillatorType;
  scale: string;
  activeRow: number;
  grid: GridState;
}

function generateNewGridState(state?: AppState): GridState {
  const cols = state?.cols || 16;
  const rows = state?.rows || 16;
  const gridState = [];

  for (let i = 0; i < cols; i++) {
    const col = [];
    for (let j = 0; j < rows; j++) {
      col.push({ isSelected: false });
    }
    gridState[i] = col;
  }
  return gridState;
}

function appReducer(
  state: AppState,
  action: { type: string; payload?: any }
): AppState {
  switch (action.type) {
    case ACTIONS.RESET:
      return {
        ...state,
        grid: generateNewGridState(),
      };

    case ACTIONS.TOGGLE_PLAYING:
      return { ...state, isPlaying: !state.isPlaying };

    case ACTIONS.TOGGLE_NOTE: {
      const gridClone = state.grid.slice();
      const { col, row } = action.payload;
      gridClone[col][row].isSelected = !gridClone[col][row].isSelected;
      return {
        ...state,
        grid: gridClone,
      };
    }

    case ACTIONS.CONTROL_CHANGE: {
      const { type, value } = action.payload;
      return { ...state, [type]: value };
    }

    default:
      return state;
  }
}

export default function App(): JSX.Element {
  const [state, dispatch] = useReducer(appReducer, {
    isPlaying: false,
    cols: 16,
    rows: 16,
    tempo: 120,
    type: 'sine',
    scale: 'pentatonic',
    activeRow: 0,
    grid: generateNewGridState(),
  });

  function resetGrid(): void {
    dispatch({ type: ACTIONS.RESET });
  }

  function togglePlay(): void {
    dispatch({
      type: ACTIONS.TOGGLE_PLAYING,
    });
  }

  function toggleNote([col, row]: [number, number]): void {
    dispatch({ type: ACTIONS.TOGGLE_NOTE, payload: { col, row } });
  }

  function controlChangeHandler(controlType, value: string | number): void {
    dispatch({
      type: ACTIONS.CONTROL_CHANGE,
      payload: { type: controlType, value },
    });
  }

  return (
    <div>
      <h1>Tonal Grid</h1>
      <Grid
        activeRow={state.activeRow}
        grid={state.grid}
        isPlaying={state.isPlaying}
        toggleSquare={toggleNote}
      />
      <Controls
        isPlaying={state.isPlaying}
        onClearClick={resetGrid}
        onStartClick={togglePlay}
        type={state.type}
        tempo={state.tempo}
        onControlChange={controlChangeHandler}
      />
    </div>
  );
}
