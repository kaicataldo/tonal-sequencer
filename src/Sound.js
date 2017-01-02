const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export const noteMap = {
  15: 'C4',
  14: 'D4',
  13: 'E4',
  12: 'G4',
  11: 'A4',
  10: 'C5',
  9: 'D5',
  8: 'E5',
  7: 'G5',
  6: 'A5',
  5: 'C6',
  4: 'D6',
  3: 'E6',
  2: 'G6',
  1: 'A6',
  0: 'C7'
};

export default class Sound {
  constructor(type, freq) {
    this.type = type;
    this.freq = freq;
    this.isPlaying = false;
  }

  createNewAudioNode(type, freq) {
    const oscillator = audioCtx.createOscillator();
    oscillator.type = type;
    oscillator.frequency.value = freq;
    return oscillator;
  }

  start() {
    this.isPlaying = true;
    this.oscillator = this.createNewAudioNode(this.type, this.freq);
    this.oscillator.connect(audioCtx.destination);
    this.oscillator.start();
  }

  stop() {
    this.isPlaying = false;
    this.oscillator.stop();
    this.oscillator.disconnect(audioCtx.destination);
  }
}
