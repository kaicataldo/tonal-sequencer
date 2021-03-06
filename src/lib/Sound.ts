import { toFreq } from 'tonal-freq';
import { scaleMap } from './sound-utils';

const audioCtx = new (window.AudioContext ||
  // eslint-disable-next-line -- I haven't figured out a way to make TS happy here :(
  (window as any).webkitAudioContext)();

export default class Sound {
  private freq: number;
  private oscillator: OscillatorNode;
  private gainNode: GainNode;
  private _isPlaying = false;

  constructor(
    private type: OscillatorType,
    private scale: string,
    private index: number
  ) {
    this.freq = this.getNoteFreq();
  }

  private getNoteFreq(): number {
    return toFreq(scaleMap[this.scale][this.index]);
  }

  private createNewAudioNode(type: string, freq: number): OscillatorNode {
    const oscillator = audioCtx.createOscillator();

    oscillator.type = type;
    oscillator.frequency.value = freq;

    return oscillator;
  }

  start(): void {
    this.gainNode = audioCtx.createGain();
    this.gainNode.connect(audioCtx.destination);

    this.oscillator = this.createNewAudioNode(this.type, this.freq);
    this.oscillator.connect(this.gainNode);

    this.oscillator.start();
    this._isPlaying = true;
  }

  stop(): void {
    this.gainNode.gain.setValueAtTime(
      this.gainNode.gain.value,
      audioCtx.currentTime
    );
    this.gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      audioCtx.currentTime + 0.03
    );

    setTimeout(() => {
      this.oscillator.stop();
      this.gainNode.disconnect();
      this.oscillator.disconnect();
      this._isPlaying = false;
    }, 30);
  }

  update(state: { type: OscillatorType; scale: string; index: number }): void {
    for (const data in state) {
      if (data === 'type') {
        this.type = state[data];
      } else if (data === 'scale') {
        this.scale = state[data];
      } else if (data === 'index') {
        this.index = state[data];
      }
    }

    this.freq = this.getNoteFreq();
  }

  isPlaying(): boolean {
    return this._isPlaying;
  }
}
