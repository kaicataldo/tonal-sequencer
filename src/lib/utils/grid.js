export function generateNewGridData(cols, rows) {
  const state = [];
  for (let i = 0; i < cols; i++) {
    const col = [];
    for (let j = 0; j < rows; j++) {
      col.push({ isSelected: false });
    }
    state[i] = col;
  }
  return state;
}

export function generateInitialGridState() {
  return {
    isPlaying: false,
    cols: 16,
    rows: 16,
    tempo: 120,
    gridData: generateNewGridData(16, 16),
    soundData: {
      type: 'triangle',
      scale: 'pentatonic'
    }
  };
}

