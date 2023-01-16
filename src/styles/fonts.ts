import type {StyleProp, TextStyle} from 'react-native';

import Colors from './colors';
import {Scale} from '../utils';

const fonts: {[key: string]: object & StyleProp<TextStyle>} = {
  title: {
    fontSize: Scale.ms(22),
    fontWeight: 'bold',
    color: Colors.black,
  },
  iconLabel: {
    fontSize: Scale.ms(16),
    fontWeight: 'bold',
    color: Colors.black,
  },
  activityLabel: {
    fontSize: Scale.ms(14),
    fontWeight: 'bold',
    color: Colors.black,
  },
  btnLabel:{
    fontSize: Scale.s(15),
    fontWeight: 'bold',
    color: Colors.black,
  }
};

export default fonts;
