import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Scale} from '../../../utils';
import {Colors} from '../../../styles';

export const ROW_HEIGHT = Scale.s(50);

export default function LabelsChallengeGrid() {
  return (
    <View>
      <View style={styles.horizontalLine} />
      <View style={styles.row} />
      <View style={styles.horizontalLine} />
      <View style={styles.row} />
      <View style={styles.horizontalLine} />
      <View style={styles.row} />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalLine: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.gray,
  },
  row: {
    height: ROW_HEIGHT,
    width: '100%',
  },
});
