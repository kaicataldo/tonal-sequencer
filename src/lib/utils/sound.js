import { toFreq } from 'tonal-freq'
import scaleMap from '../scaleMap';

export function getNoteFreq(scale, index) {
  return toFreq(scaleMap[scale][index]);
}

