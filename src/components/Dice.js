/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useEffect, useContext} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {storeContext, aTypes} from '../store';
import {Colors, getRandomIntInclusive} from '../config';

const Dice = () => {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [state, dispatch] = useContext(storeContext);
  const {diceFace = 0, shake = false} = state;

  const setFace = () => {
    dispatch({
      type: aTypes.SET_DICE,
      payload: {
        diceFace: getRandomIntInclusive(1, 6),
      },
    });
  };

  useEffect(() => {
    let timerRef;
    if (shake) {
      timerRef = setInterval(() => {
        setFace();
      }, 200);
    } else {
      clearInterval(timerRef);
    }
    return () => {
      clearInterval(timerRef);
    };
  }, [shake]);

  useEffect(() => {
    if (shake) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnimation, {
            toValue: 1.0,
            duration: 50,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: -1.0,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: 0.0,
            duration: 50,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      shakeAnimation.stopAnimation();
    }
  }, [shake, shakeAnimation]);

  const animationStyles = {
    transform: [
      {
        translateY: shakeAnimation.interpolate({
          inputRange: [-1, 1],
          outputRange: [-5, 5],
        }),
      },
      {
        translateX: shakeAnimation.interpolate({
          inputRange: [-1, 1],
          outputRange: [-30, 30],
        }),
      },
    ],
  };

  switch (diceFace) {
    case 1:
      return (
        <Animated.Image
          source={require('../assets/ic_dice_1.png')}
          style={[styles.diceImage, animationStyles]}
        />
      );

    case 2:
      return (
        <Animated.Image
          source={require('../assets/ic_dice_2.png')}
          style={[styles.diceImage, animationStyles]}
        />
      );
    case 3:
      return (
        <Animated.Image
          source={require('../assets/ic_dice_3.png')}
          style={[styles.diceImage, animationStyles]}
        />
      );
    case 4:
      return (
        <Animated.Image
          source={require('../assets/ic_dice_4.png')}
          style={[styles.diceImage, animationStyles]}
        />
      );
    case 5:
      return (
        <Animated.Image
          source={require('../assets/ic_dice_5.png')}
          style={[styles.diceImage, animationStyles]}
        />
      );
    case 6:
      return (
        <Animated.Image
          source={require('../assets/ic_dice_6.png')}
          style={[styles.diceImage, animationStyles]}
        />
      );

    default:
      return (
        <Animated.Image
          source={require('../assets/ic_dice_1.png')}
          style={[styles.diceImage, animationStyles]}
        />
      );
  }
};

const styles = StyleSheet.create({
  container: {},
  diceImage: {
    height: 100,
    width: 100,
  },
});

export default Dice;
