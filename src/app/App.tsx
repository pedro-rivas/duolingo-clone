import React, {useEffect, useState} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';

import {Colors, Spacing} from '../styles';
import {Logger, Scale} from '../utils';

import {LabelsChallenge} from '../features/';
import {
  MainButton,
  LoadingHeader,
  CustomSafeAreaView,
  ActivityLabel,
  Title,
} from '../components';

import Lottie from 'lottie-react-native';

export default function App() {

 const [ selection, setSelection] = useState('');

  useEffect(() => {
    Logger.log('mount labels challenge screen');
    return () => {
      Logger.log('unmount labels challenge screen');
    };
  }, []);

  function onCompleted(val: string) {
    setSelection(val)
  }

  return (
    <CustomSafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View style={styles.mainGrap}>
        <View>
          <LoadingHeader />
          <ActivityLabel type={'newWord'} />
          <Title label={'Traduce esta oración'} />
          <Lottie
            style={{height: Scale.s(180), left: -10, bottom: -Scale.s(10)}}
            resizeMode={'contain'}
            autoSize
            source={require('../../assets/lotties/path_falstaff_eating.json')}
            autoPlay
            loop
          />
          <LabelsChallenge
            onCompleted={onCompleted}
            label={'componentes de duolingo para react native'}
            extraWords={'los'}
          />
        </View>
        <MainButton 
          disabled={selection === ''} 
          label={'COMPROBAR'} 
          callback={()=>{
            console.log(' press out');
          }}
        />
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainGrap: {
    flex: 1,
    padding: Spacing.l,
    justifyContent: 'space-between',
  },
});
