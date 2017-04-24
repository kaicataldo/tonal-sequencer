const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export default class Sound {
  constructor(state) {
    this.state = state;
    this.state.isPlaying = false;
  }

  createNewAudioNode(type, freq) {
    const oscillator = audioCtx.createOscillator();

    oscillator.type = type;
    oscillator.frequency.value = freq;

    return oscillator;
  }

  start() {
    this.gainNode = audioCtx.createGain();
    this.gainNode.connect(audioCtx.destination);

    this.oscillator = this.createNewAudioNode(this.state.type, this.state.freq);
    this.oscillator.connect(this.gainNode);

    this.oscillator.start()
    this.setState({ isPlaying: true });
  }

  stop() {
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, audioCtx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);

    setTimeout(() => {
      this.oscillator.stop();
      this.gainNode.disconnect();
      this.oscillator.disconnect();
      this.setState({ isPlaying: false });
    }, 30)
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  isPlaying() {
    return this.state.isPlaying;
  }
}
