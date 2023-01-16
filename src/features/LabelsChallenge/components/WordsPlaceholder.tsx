import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Scale} from '../../../utils';
import {Colors} from '../../../styles';

import {BUTTON_HEIGHT} from '../../../components/Buttons/MainButton';

interface WordsPlaceholdeProps {
  words: string[];
}

function WordsPlaceholder({words}: WordsPlaceholdeProps) {
  return (
    <View style={styles.wordsGrap}>
      {words.map((word, i) => (
        <View key={i} style={styles.wordPlaceholderGrap}>
          <Text style={styles.wordPlaholder}>{`${word}`}</Text>
        </View>
      ))}
    </View>
  );
}

export default React.memo(WordsPlaceholder, () => true);

const styles = StyleSheet.create({
  wordsGrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: -1,
  },
  wordPlaceholderGrap: {
    height: BUTTON_HEIGHT - 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Scale.s(10),
    borderRadius: 12,
    backgroundColor: Colors.gray,
    borderWidth: 2,
    borderColor: Colors.gray,
    margin: Scale.s(5),
  },
  wordPlaholder: {
    fontSize: Scale.s(17),
    color: Colors.gray,
  },
});
