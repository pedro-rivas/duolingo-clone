import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Animated} from 'react-native';

import {Colors, Fonts} from '../../styles';
import {Scale} from '../../utils';

export const BUTTON_HEIGHT = Scale.s(45);
export const ANIM_CONFIG = {duration: 80, useNativeDriver: true};

interface MainButtonProps {
  label: string;
  callback: () => void;
  testID?: string;
  disabled?: boolean;
  type?: 'primary';
}

export default function MainButton({
  label,
  type = 'primary',
  testID,
  disabled = false,
  callback,
}: MainButtonProps) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animate(-2);
  }, []);

  function animate(toValue: 2 | -2) {
    Animated.timing(translateY, {
      toValue,
      ...ANIM_CONFIG,
    }).start();
  }

  function onPressIn() {
    animate(2);
  }

  function onPressOut() {
    animate(-2);
    callback();
  }

  if (disabled) {
    return (
      <View style={styles.mainDisabledButton}>
        <Text style={styles.btnDisabledLabel}>{label}</Text>
      </View>
    );
  } else {
    return (
      <Pressable {...{onPressIn, onPressOut, testID}}>
        <View style={styles.mainGrap}>
          <Animated.View
            style={[styles.mainButton, {transform: [{translateY}]}]}>
            <Text style={styles.btnLabel}>{label}</Text>
          </Animated.View>
          <View style={styles.background} />
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  mainDisabledButton: {
    width: '100%',
    height: BUTTON_HEIGHT,
    borderRadius: 14,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDisabledLabel: {
    ...Fonts.btnLabel,
    color: '#aaaaaa',
  },
  mainGrap: {
    height: BUTTON_HEIGHT,
  },
  background: {
    backgroundColor: Colors.greenDark,
    width: '100%',
    height: BUTTON_HEIGHT - 2,
    borderRadius: 14,
    position: 'absolute',
    zIndex: -1,
    bottom: 0,
  },
  mainButton: {
    width: '100%',
    height: BUTTON_HEIGHT - 2,
    borderRadius: 14,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLabel: {
    ...Fonts.btnLabel,
    color: Colors.white,
  },
});
