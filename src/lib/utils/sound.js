import noteParser from 'note-parser';
import scaleMap from '../scaleMap';

export function getNoteFreq(scale, index) {
  return noteParser.parse(scaleMap[scale][index]).freq;
}

