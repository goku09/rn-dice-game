/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {storeContext, aTypes} from '../store';
import {Form, GameView} from '../components';
import {Colors} from '../config';

export default function Main() {
  const [state, dispatch] = useContext(storeContext);
  const {gameFormVisible, ftue} = state;

  const onPressNewGame = () => {
    dispatch({
      type: aTypes.SET_FORM_MODAL,
      payload: {visible: true},
    });
    dispatch({
      type: aTypes.SET_PLAYERS_COUNT,
      payload: {playersCount: 0},
    });
    dispatch({
      type: aTypes.SET_WINNING_SCORE,
      payload: {winningScore: 0},
    });
    if (!ftue) {
      dispatch({
        type: aTypes.SET_FTUE,
        payload: {
          ftue: true,
        },
      });
    }
  };

  const isModalOpen = gameFormVisible;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headingContainer}>
          <Image
            source={require('../assets/ic_dice_logo.png')}
            style={{height: 40, width: 40}}
          />
          <Text style={styles.heading}>Game Of Dice</Text>
        </View>
        <TouchableOpacity
          style={[styles.newGameButton, {opacity: isModalOpen ? 0.4 : 1}]}
          onPress={onPressNewGame}
          disabled={isModalOpen}>
          <Image
            source={require('../assets/ic_new_game.png')}
            style={{height: 36, width: 36}}
          />
          <Text style={{fontSize: 10}}>New Game</Text>
        </TouchableOpacity>
      </View>
      {gameFormVisible ? <Form /> : <GameView />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    paddingHorizontal: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 8,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newGameButton: {alignItems: 'center'},
});
