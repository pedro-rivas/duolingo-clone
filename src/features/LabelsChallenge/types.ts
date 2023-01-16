import {Animated} from 'react-native';

export interface LabelsChallengeProps {
  /**
   * The correct label to translate
   */
  label: string;
  /**
   * Extra label to mix
   */
  extraWords: string;
  /**
   * On completed callback
   */
  onCompleted: (selectedWords: string) => void;
}

export interface ActiveWords {
  ref: string;
  words: {[key: string]: any};
  rowCapacity: number;
  getEntries: () => [string, any][];
  deleteWord: (ref: string) => void;
  updateActiveWords: (animRefs: Words) => void;
  checkIfRowIsBussy: (row: 'row1' | 'row2') => boolean;
}

export interface Words {
  [key: string]: {
    yValue: Animated.Value;
    xValue: Animated.Value;
    xPosition: number;
    yPosition: number;
    direction: 'up' | 'down';
    width?: number;
    x?: number;
    y?: number;
    idX: string;
    idY: string;
  };
}
