import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Spacing, Colors, Fonts} from '../../styles';
import {Scale} from '../../utils';

import {RetweetSolidIcon} from '..';

interface ActivityLabelProps {
  type: 'newWord';
}

const labels = {
  newWord: 'palabra nueva',
};

const iconWidth = Scale.s(13);

export default function ActivityLabel({type}: ActivityLabelProps) {
  return (
    <View style={styles.mainGrap}>
      <View style={styles[`${type}Circle`]}>
        <RetweetSolidIcon
          height={iconWidth}
          width={iconWidth}
          color={Colors.white}
        />
      </View>
      <Text style={styles[type]}>{`${labels[type]}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainGrap: {
    flexDirection: 'row',
    marginBottom: Spacing.s,
    alignItems: 'center',
  },
  newWordCircle: {
    width: Scale.s(20),
    height: Scale.s(20),
    backgroundColor: Colors.orange,
    borderRadius: 50,
    marginRight: Spacing.s,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '90deg'}],
  },
  newWord: {
    ...Fonts.activityLabel,
    color: Colors.orange,
    textTransform: 'uppercase',
  },
});
