import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import type {LayoutChangeEvent} from 'react-native';

import {LabelsChallengeProps} from './types';

import LabelsChallengeGrid, {
  ROW_HEIGHT,
} from './components/LabelsChallengeGrid';
import WordsPlaceholder from './components/WordsPlaceholder';
import Word from './components/Word';
import {genereteRefs, labelToArray, activeWords} from './utils';

const SPEED = 100;

/**
 *  TODO:
 * [ ]: tweak reorder anim.
 */

function LabelsChallenge({
  onCompleted,
  extraWords,
  label,
}: LabelsChallengeProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const wordsArray = useRef(labelToArray(label, extraWords)).current;
  const animationRefs = useRef(genereteRefs(wordsArray)).current;

  useEffect(() => {
    for (const key in animationRefs) {
      if (Object.prototype.hasOwnProperty.call(animationRefs, key)) {
        const word = animationRefs[key];
        const idX = word.xValue.addListener(e => (word.xPosition = e.value));
        const idY = word.yValue.addListener(e => (word.yPosition = e.value));
        word.idX = idX;
        word.idY = idY;
      }
    }

    return () => {
      for (const key in animationRefs) {
        if (Object.prototype.hasOwnProperty.call(animationRefs, key)) {
          const word = animationRefs[key];
          word.xValue.removeListener(word.idX);
          word.yValue.removeListener(word.idY);
        }
      }
    };
  }, []);

  useEffect(() => {
      const selectedLabel = selectedWords.toString().replace(/,/g, ' ');
      onCompleted(selectedLabel);
  }, [selectedWords]);

  function updateSelection(wordSelected: string, direction: 'up' | 'down') {
    if (direction === 'up') {
      setSelectedWords(prevWords => [...prevWords, wordSelected]);
    } else {
      setSelectedWords(prevWords =>
        prevWords.filter(word => word != wordSelected),
      );
    }
  }

  function reOrderWords() {
    let shouldReOrder = false;
    let animatationsArray: any[] = [];
    let acc = 0;
    const config = {duration: 250, useNativeDriver: true};
    const activeWordsArr = activeWords.getEntries();
    const {ref, rowCapacity} = activeWords;
    const currentXTranslation = animationRefs[ref].width!;
    if (activeWordsArr.length > 1) {
      for (let i = 0; i < activeWordsArr.length; i++) {
        const [key, word] = activeWordsArr[i];
        if (key !== ref) {
          acc += word.width;
        }
        if (shouldReOrder) {
          const [prevKey, _] = activeWordsArr[i - 1];
          const isInSecond =
            animationRefs[key].yPosition > animationRefs[prevKey].yPosition;

          if (isInSecond) {
            if (acc < rowCapacity) {
              animatationsArray.push(
                Animated.timing(animationRefs[key].yValue, {
                  toValue: animationRefs[key].yPosition - (ROW_HEIGHT + 2),
                  ...config,
                }),
                Animated.timing(animationRefs[key].xValue, {
                  toValue: animationRefs[key].xPosition + (acc - word.width),
                  ...config,
                }),
              );
            }
          } else {
            animatationsArray.push(
              Animated.spring(animationRefs[key].xValue, {
                toValue: animationRefs[key].xPosition - currentXTranslation,
                useNativeDriver: true,
              }),
            );
          }
        }
        // start animation after
        // the selected word
        if (key === ref) {
          shouldReOrder = true;
        }
      }
      if (animatationsArray.length) {
        Animated.parallel(animatationsArray).start();
      }
    }
    activeWords.deleteWord(ref);
  }

  function calculateYtranslation() {
    const firstRow = ROW_HEIGHT * 3 + 5;
    const secondRow = ROW_HEIGHT * 2 + 3;
    const {ref} = activeWords;
    if (activeWords.checkIfRowIsBussy('row1')) {
      return -secondRow - animationRefs[ref].y!;
    } else {
      return -firstRow - animationRefs[ref].y!;
    }
  }

  function calculateXtranslation() {
    let acc = 0;
    let rowChecked = false;
    let xTranslation = 0;
    const {rowCapacity, ref} = activeWords;
    const entries = activeWords.getEntries();

    for (let i = 0; i < entries.length; i++) {
      const [key, word] = entries[i];
      acc += word.width;
      if (acc > rowCapacity) {
        if (rowChecked) {
          xTranslation -= entries[i - 1][1].width;
        } else {
          xTranslation = 0;
          rowChecked = true;
        }
      } else if (ref !== key) {
        xTranslation -= word.width;
      }
    }
    return -(animationRefs[ref].x! + xTranslation);
  }

  function getTranslation() {
    const translateY = calculateYtranslation();
    const translateX = calculateXtranslation();
    return {translateX, translateY};
  }

  function animatedWithTiming({translateY, translateX, direction}: any) {
    let placeAnimations: any[] = [];
    const {ref} = activeWords;
    const config = {duration: SPEED, useNativeDriver: true};
    placeAnimations.push(
      Animated.timing(animationRefs[ref].yValue, {
        toValue: translateY,
        ...config,
      }),
      Animated.timing(animationRefs[ref].xValue, {
        toValue: translateX,
        ...config,
      }),
    );
    Animated.parallel(placeAnimations).start(() => {
      animationRefs[ref].direction = direction === 'up' ? 'down' : 'up';
      updateSelection(ref, direction);
    });
  }

  function animate(ref: string) {
    activeWords.ref = ref;
    activeWords.updateActiveWords(animationRefs);
    const {direction, width, y, x} = animationRefs[ref];
    if (width === undefined || y === undefined || x === undefined) {
      return;
    }
    if (direction === 'down') {
      // relocate a word
      animatedWithTiming({translateX: 0, translateY: 0, direction});
      // reorder words
      reOrderWords();
    } else {
      // select a word
      const {translateX, translateY} = getTranslation();
      animatedWithTiming({translateX, translateY, direction});
    }
  }

  function onLayout({nativeEvent}: LayoutChangeEvent, word: string) {
    const {layout} = nativeEvent;
    animationRefs[word].width = layout.width;
    animationRefs[word].x = layout.x;
    animationRefs[word].y = layout.y;
  }

  return (
    <View style={styles.mainGrap}>
      <LabelsChallengeGrid />
      <View>
        <View style={styles.wordsGrap}>
          {wordsArray.map((word, i) => (
            <Animated.View
              key={i}
              style={[
                {
                  transform: [
                    {translateY: animationRefs[word].yValue},
                    {translateX: animationRefs[word].xValue},
                  ],
                },
              ]}
              onLayout={val => onLayout(val, word)}>
              <Word callback={() => animate(word)} {...{word}} />
            </Animated.View>
          ))}
        </View>
        <WordsPlaceholder words={wordsArray} />
      </View>
    </View>
  );
}

export default React.memo(LabelsChallenge, () => true);

const styles = StyleSheet.create({
  mainGrap: {
    backgroundColor: 'white',
  },
  wordsGrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
