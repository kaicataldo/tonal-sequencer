import { toFreq } from 'tonal-freq';

const scaleMap = {
  pentatonic: ['C7', 'A6', 'G6', 'E6', 'D6', 'C6', 'A5', 'G5', 'E5', 'D5', 'C5', 'A4', 'G4', 'E4', 'D4', 'C4']
};

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export default class Sound {
  constructor({ type, scale, index }) {
    this.type = type;
    this.scale = scale;
    this.index = index;
    this.freq = this._getNoteFreq(scale, index);
    this.isPlaying = false;
  }

  start() {
    this.gainNode = audioCtx.createGain();
    this.gainNode.connect(audioCtx.destination);

    this.oscillator = this._createNewAudioNode(this.type, this.freq);
    this.oscillator.connect(this.gainNode);

    this.oscillator.start();
    this.isPlaying = true;
  }

  stop() {
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, audioCtx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);

    setTimeout(() => {
      this.oscillator.stop();
      this.gainNode.disconnect();
      this.oscillator.disconnect();
      this.isPlaying = false;
    }, 30);
  }

  update(state) {
    for (const data in state) {
      this[data] = state[data];
    }
    this.freq = this._getNoteFreq();
  }

  _getNoteFreq() {
    return toFreq(scaleMap[this.scale][this.index]);
  }

  _createNewAudioNode(type, freq) {
    const oscillator = audioCtx.createOscillator();

    oscillator.type = type;
    oscillator.frequency.value = freq;

    return oscillator;
  }
}
