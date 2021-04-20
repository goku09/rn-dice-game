import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Button,
  Keyboard,
  Pressable,
} from 'react-native';
import {storeContext, aTypes} from '../store';
import {Colors, shuffleArray} from '../config';

export default function Form() {
  const [state, dispatch] = useContext(storeContext);
  const {gameFormVisible = false, playersCount = 0, winningScore = 0} = state;

  const setPlayersCount = count => {
    dispatch({
      type: aTypes.SET_PLAYERS_COUNT,
      payload: {playersCount: count},
    });
  };

  const setWinningScore = score => {
    dispatch({
      type: aTypes.SET_WINNING_SCORE,
      payload: {winningScore: score},
    });
  };

  const onPressPlay = () => {
    initialisePlayersList();
    dispatch({
      type: aTypes.SET_FORM_MODAL,
      payload: {
        visible: false,
      },
    });
    dispatch({
      type: aTypes.SET_ROUND_INFO,
      payload: {
        visible: true,
      },
    });
  };

  const initialisePlayersList = () => {
    let newPlayersList = [];
    for (let i = 1; i <= playersCount; i++) {
      newPlayersList.push({
        name: `Player-${i}`,
        score: 0,
        consecutiveOnes: 0,
        lastRollSix: false,
        hasCompleted: false,
        history: [],
      });
    }
    newPlayersList = shuffleArray(newPlayersList);
    dispatch({
      type: aTypes.SET_PLAYERS_LIST,
      payload: {playersList: newPlayersList},
    });
  };

  return (
    <Modal visible={gameFormVisible} animationType="fade" transparent={true}>
      <Pressable style={styles.outerContainer} onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>Start a new game</Text>
          <TextInput
            style={[styles.input, {marginTop: 48}]}
            onChangeText={setPlayersCount}
            value={playersCount || ''}
            placeholder="Enter the number of players"
            keyboardType="numeric"
            placeholderTextColor={Colors.placeholder}
          />
          <TextInput
            style={[styles.input, {marginTop: 24}]}
            onChangeText={setWinningScore}
            value={winningScore || ''}
            placeholder="Enter the winning score"
            keyboardType="numeric"
            placeholderTextColor={Colors.placeholder}
          />
          <View style={styles.button}>
            <Button
              onPress={onPressPlay}
              title="Start"
              color={Colors.primary}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    height: '60%',
    width: '80%',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backdrop,
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    color: Colors.text,
    backgroundColor: Colors.surface,
    borderColor: Colors.disabled,
  },
  button: {
    height: 40,
    width: 200,
    marginTop: 36,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
});
