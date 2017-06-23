// @flow

import { toFreq } from "tonal-freq";
import { scaleMap } from "./sound-utils";

const audioCtx: AudioContext = new (window.AudioContext ||
  window.webkitAudioContext)();

export default class Sound {
  _type: WaveType;
  _scale: string;
  _index: number;
  _freq: number;
  _isPlaying: boolean;
  _oscillator: OscillatorNode;
  _gainNode: GainNode;

  constructor({
    type,
    scale,
    index
  }: {
    type: WaveType,
    scale: string,
    index: number
  }) {
    this._type = type;
    this._scale = scale;
    this._index = index;
    this._freq = this._getNoteFreq();
    this._isPlaying = false;
  }

  start() {
    this._gainNode = audioCtx.createGain();
    this._gainNode.connect(audioCtx.destination);

    this._oscillator = this._createNewAudioNode(this._type, this._freq);
    this._oscillator.connect(this._gainNode);

    this._oscillator.start();
    this._isPlaying = true;
  }

  stop() {
    this._gainNode.gain.setValueAtTime(
      this._gainNode.gain.value,
      audioCtx.currentTime
    );
    this._gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      audioCtx.currentTime + 0.03
    );

    setTimeout(() => {
      this._oscillator.stop();
      this._gainNode.disconnect();
      this._oscillator.disconnect();
      this._isPlaying = false;
    }, 30);
  }

  update(state: Object) {
    for (const data in state) {
      if (data === "type") {
        this._type = state[data];
      } else if (data === "scale") {
        this._scale = state[data];
      } else if (data === "index") {
        this._index = state[data];
      }
    }

    this._freq = this._getNoteFreq();
  }

  isPlaying() {
    return this._isPlaying;
  }

  _getNoteFreq(): number {
    return toFreq(scaleMap[this._scale][this._index]);
  }

  _createNewAudioNode(type: WaveType, freq: number): OscillatorNode {
    const oscillator = audioCtx.createOscillator();

    oscillator.type = type;
    oscillator.frequency.value = freq;

    return oscillator;
  }
}
