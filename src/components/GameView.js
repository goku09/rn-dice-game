import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {storeContext} from '../store';
import {Game, RoundInfo} from '../components';

export default function GameView() {
  const [state, dispatch] = useContext(storeContext);
  const {roundInfoVisible = false} = state;

  return (
    <View style={styles.container}>
      {roundInfoVisible ? <RoundInfo /> : <Game />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
