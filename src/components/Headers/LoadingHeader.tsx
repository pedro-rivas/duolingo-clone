import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

import { Logger, Scale } from '../../utils';
import { Spacing, Colors, Fonts } from '../../styles';
import { LoadingBar, XButton, HeartSolidIcon } from '../';

const heartWidth = Scale.s(22);
const heartCount = 1;
const screenWidth = Dimensions.get('window').width;
const padding = Scale.s(Spacing.l) * 2;
const leftIconSpace = Scale.s(22) + Spacing.m;
const rightIconSpace = Scale.s(22) + Spacing.m + Spacing.s * 1.5;
const barWidth = screenWidth - (padding + leftIconSpace + rightIconSpace);

/**
 * TODO:
 * [ ]: Monify memo function.
 * [ ]: Animate bar.
 */

function LoadingHeader() {
  function closeCallback() {
    Logger.log('close callback');
  }

  return (
    <View style={styles.mainGrap}>
      <View style={styles.itemGrap}>
        <XButton onPress={closeCallback} />
        <View style={styles.whiteSpace} />
      </View>
      <LoadingBar width={barWidth} />
      <View style={styles.itemGrap}>
        <View style={styles.whiteSpace} />
        <HeartSolidIcon
          width={heartWidth}
          height={heartWidth}
          color={Colors.red}
        />
        <Text style={styles.heartCounter}>{`${heartCount}`}</Text>
      </View>
    </View>
  );
}
export default React.memo(LoadingHeader, () => true);

const styles = StyleSheet.create({
  mainGrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.l,
  },
  itemGrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whiteSpace: {
    width: Spacing.m,
    height: Spacing.m,
  },
  heartCounter: {
    ...Fonts.iconLabel,
    color: Colors.red,
    marginLeft: Spacing.s,
  },
});
