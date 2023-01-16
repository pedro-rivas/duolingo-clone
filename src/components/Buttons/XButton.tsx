import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';

import {Scale} from '../../utils';
import {Colors} from '../../styles';

import {XsolidIcon} from '../';

interface XButtonPros {
  onPress: () => void;
  testID?: string;
}

const width = Scale.s(22);
const height = Scale.s(22);
const color = Colors.grayDark;
const hitSlop = {top: 5, left: 5, bottom: 5, right: 5};

export default function XButton({onPress, testID}: XButtonPros) {
  return (
    <Pressable {...{onPress, hitSlop, testID}}>
      <View style={styles.mainGrap}>
        <XsolidIcon {...{width, height, color}} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainGrap: {
    width,
    height,
  },
});
