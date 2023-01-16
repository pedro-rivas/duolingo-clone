import React, {useRef, useEffect} from 'react';
import {Pressable, View, Text, StyleSheet, Animated} from 'react-native';

import {Scale} from '../../../utils';
import {Colors} from '../../../styles';

import {
  BUTTON_HEIGHT,
  ANIM_CONFIG,
} from '../../../components/Buttons/MainButton';

interface WordProps {
  callback: () => void;
  word: string;
}

function Word({callback, word}: WordProps) {
  useEffect(() => {
    animate(-1);
  }, []);
  const translateY = useRef(new Animated.Value(0)).current;

  function animate(toValue: 1 | -1) {
    Animated.timing(translateY, {
      toValue,
      ...ANIM_CONFIG,
    }).start();
  }

  function onPressIn() {
    animate(1);
  }

  function onPressOut() {
    animate(-1);
    callback();
  }

  return (
    <Pressable {...{onPressIn, onPressOut}} style={styles.pressable}>
      <View style={styles.wordBtnGrap}>
        <Animated.View style={[styles.wordGrap, {transform: [{translateY}]}]}>
          <Text style={styles.word}>{`${word}`}</Text>
        </Animated.View>
        <View style={styles.background} />
      </View>
    </Pressable>
  );
}

export default React.memo(Word, () => true);

const styles = StyleSheet.create({
  pressable: {
    margin: Scale.s(5),
  },
  wordBtnGrap: {
    height: BUTTON_HEIGHT - 1,
  },
  wordGrap: {
    borderColor: Colors.gray,
    height: BUTTON_HEIGHT - 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    paddingHorizontal: Scale.s(10),
    borderRadius: 12,
    backgroundColor: 'white',
  },
  word: {
    fontSize: Scale.s(17),
    color: Colors.black,
  },
  background: {
    height: BUTTON_HEIGHT - 1,
    backgroundColor: Colors.gray,
    width: '100%',
    borderRadius: 12,
    position: 'absolute',
    zIndex: -1,
    bottom: 0,
  },
});
