const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

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
