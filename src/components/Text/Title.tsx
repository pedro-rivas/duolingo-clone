import React from 'react';
import {Text} from 'react-native';

import {Fonts} from '../../styles';

interface TitleProps {
  label: string;
}

export default function Title({label}: TitleProps) {
  return <Text style={Fonts.title}>{`${label}`}</Text>;
}
