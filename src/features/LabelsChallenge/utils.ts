import {useRef} from 'react';
import {Animated, Dimensions} from 'react-native';

import {Words, ActiveWords} from './types';
import {Spacing} from '../../styles';

export const SCREE_WIDTH = Dimensions.get('window').width;

/**
 *
 * @param words
 * @returns
 */
export function genereteRefs(words: string[]) {
  let wordsRefs: Words = {};

  words.forEach(word => {
    wordsRefs = {
      ...wordsRefs,
      [`${word}`]: {
        yValue: useRef(new Animated.Value(0)).current,
        xValue: useRef(new Animated.Value(0)).current,
        direction: 'up',
        xPosition: 0,
        yPosition: 0,
        idY: word,
        idX: word,
      },
    };
  });

  return wordsRefs;
}

/**
 * Convert the labels to a words array
 * @param label
 * @param extraWords
 * @returns
 */
export function labelToArray(label: string, extraWords: string) {
  const correcWordsArray = label.split(' ');
  const extraWordsArray = extraWords.split(' ');
  const array = correcWordsArray
    .concat(extraWordsArray)
    .sort(() => 0.5 - Math.random());
  return array;
}

export const activeWords: ActiveWords = {
  ref: '',
  words: {},
  rowCapacity: Math.round(SCREE_WIDTH - Spacing.l * 2),
  updateActiveWords(animRefs) {
    this.words = {
      ...this.words,
      [this.ref]: {...animRefs[this.ref]},
    };
  },
  getEntries() {
    return Object.entries(this.words);
  },
  deleteWord() {
    delete this.words[this.ref];
  },
  checkIfRowIsBussy(row: 'row1' | 'row2') {
    const rowCapacity = this.rowCapacity;
    const entries = this.getEntries();
    const accWidth = Math.round(
      entries.map(([_, word]) => word.width).reduce((acc, val) => acc + val),
    );
    const isBussy = accWidth > rowCapacity;
    return isBussy;
  },
};
