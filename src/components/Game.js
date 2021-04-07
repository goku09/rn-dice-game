/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import RNShake from 'react-native-shake';
import {storeContext, aTypes} from '../store';
import {Dice} from '../components';

export default function Game() {
  const [state, dispatch] = useContext(storeContext);
  const {} = state;

  const setShake = shake => {
    dispatch({
      type: aTypes.SET_SHAKE,
      payload: {
        shake,
      },
    });
  };

  const setRoundInfo = () => {
    setTimeout(() => {
      dispatch({
        type: aTypes.SET_ROUND_INFO,
        payload: {
          visible: true,
        },
      });
    }, 2000);
  };

  useEffect(() => {
    let timerRef;
    RNShake.addEventListener('ShakeEvent', () => {
      setShake(true);
      timerRef = setTimeout(() => {
        setShake(false);
        setRoundInfo();
      }, 3000);
    });
    return () => {
      clearTimeout(timerRef);
      RNShake.removeEventListener('ShakeEvent');
    };
  }, []);

  return (
    <View style={styles.container}>
      <Dice />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
