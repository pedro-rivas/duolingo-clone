import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Colors} from '../../styles';
import {Scale} from '../../utils';

const barHeight = Scale.s(13);
const borderRadius = barHeight;

interface LoadingBarPros {
  width?: number | string;
}

export default function LoadingBar({width = '100%'}: LoadingBarPros) {
  return (
    <View style={[styles.mainGrap, {width}]}>
      <View style={styles.greenBar}>
        <View style={styles.lightBar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainGrap: {
    height: barHeight,
    borderRadius,
    backgroundColor: Colors.gray,
  },
  greenBar: {
    width: Scale.ms(100),
    height: barHeight,
    borderRadius,
    backgroundColor: Colors.green,
    alignItems: 'center',
  },
  lightBar: {
    width: Scale.ms(50),
    backgroundColor: Colors.white,
    height: 5,
    borderRadius: 5,
    opacity: 0.3,
    marginTop: Scale.s(3),
  },
});
