/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  ScrollView,
  ToastAndroid,
  FlatList,
} from 'react-native';
import {storeContext, aTypes} from '../store';
import {Colors} from '../config';

export default function RoundInfo() {
  const [state, dispatch] = useContext(storeContext);
  const {
    playersList = [],
    roundIndex = 0,
    diceFace = 0,
    ftue,
    winningScore,
  } = state;

  useEffect(() => {
    if (!ftue) {
      let list = playersList.slice();
      list[roundIndex].score += diceFace;
      if (diceFace === 1) {
        list[roundIndex].consecutiveOnes++;
      }
      if (diceFace === 6) {
        list[roundIndex].lastRollSix = true;
      }
      if (
        !list[roundIndex].hasCompleted &&
        list[roundIndex].score >= winningScore
      ) {
        list[roundIndex].hasCompleted = true;
        ToastAndroid.showWithGravity(
          `${list[roundIndex].name} has completed the game after scoring ${list[roundIndex].score}`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        list.splice(roundIndex, 1);
      }
      dispatch({
        type: aTypes.SET_PLAYERS_LIST,
        payload: {
          playersList: list,
        },
      });
    }
  }, [roundIndex]);

  const onPressPlay = () => {
    let nextRoundIndex = (roundIndex + 1) % playersList.length;
    if (ftue) {
      dispatch({
        type: aTypes.SET_FTUE,
        payload: {
          ftue: false,
        },
      });
      ToastAndroid.show(
        `${playersList[roundIndex]?.name} will start the game`,
        ToastAndroid.SHORT,
      );
    } else {
      if (diceFace === 6 && playersList[roundIndex]?.lastRollSix) {
        ToastAndroid.show(
          ` ${playersList[roundIndex]?.name} gets another turn as they got a 6`,
          ToastAndroid.SHORT,
        );
      } else if (playersList[nextRoundIndex]?.consecutiveOnes === 2) {
        ToastAndroid.show(
          ` ${
            playersList[nextRoundIndex]?.name
          }’s turn gets skipped as they got two consecutive 1's and It’s ${
            playersList[nextRoundIndex + 1]?.name
          }’s turn now`,
          ToastAndroid.SHORT,
        );
        let list = playersList.slice();
        list[nextRoundIndex].consecutiveOnes = 0;
        dispatch({
          type: aTypes.SET_PLAYERS_LIST,
          payload: {
            playersList: list,
          },
        });
        dispatch({
          type: aTypes.SET_ROUND_INDEX,
          payload: {
            roundIndex: nextRoundIndex + 1,
          },
        });
      } else {
        ToastAndroid.show(
          `It’s ${playersList[nextRoundIndex]?.name}’s turn now`,
          ToastAndroid.SHORT,
        );
        dispatch({
          type: aTypes.SET_ROUND_INDEX,
          payload: {
            roundIndex: nextRoundIndex,
          },
        });
      }
    }
    dispatch({
      type: aTypes.SET_ROUND_INFO,
      payload: {
        visible: false,
      },
    });
  };

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

  const OrderSection = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.subHeading}>Order to roll the dice</Text>
        <ScrollView
          style={{marginTop: 4}}
          horizontal
          contentContainerStyle={{paddingVertical: 12}}>
          {playersList.map(player => (
            <Pressable key={player?.name?.toString()} style={styles.orderItem}>
              <Text>{player?.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderTableItem = ({item, index}) => {
    return (
      <View style={styles.tableItem}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text>{index + 1}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text>{item.name}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text>{item.score}</Text>
        </View>
      </View>
    );
  };

  const renderTableHeader = () => {
    return (
      <View style={styles.tableItem}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text>Rank</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text>Name</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text>Score</Text>
        </View>
      </View>
    );
  };

  const TableSection = () => {
    let list = playersList.slice();
    list.sort((a, b) => b.score - a.score);
    return (
      <View style={styles.section}>
        <Text style={styles.subHeading}>Current Players Standing</Text>
        <FlatList
          style={{maxHeight: 200}}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{paddingVertical: 12}}
          data={list}
          renderItem={renderTableItem}
          ListHeaderComponent={renderTableHeader}
          ListHeaderComponentStyle={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.primary,
            backgroundColor: Colors.surface,
          }}
          keyExtractor={item => item.name}
        />
      </View>
    );
  };

  const GameOverSection = () => {
    return (
      <View style={styles.section}>
        <Text style={[styles.subHeading, {fontSize: 20}]}>Game Over</Text>
        <View style={styles.button}>
          <Button
            onPress={onPressNewGame}
            title="Start New Game"
            color={Colors.primary}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        {ftue ? (
          <OrderSection />
        ) : playersList.length === 0 ? (
          <GameOverSection />
        ) : (
          <TableSection />
        )}
      </View>
      {playersList.length !== 0 && (
        <View style={styles.button}>
          <Button onPress={onPressPlay} title="Next" color={Colors.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  mainContainer: {
    flex: 1,
  },
  button: {
    alignSelf: 'center',
    height: 40,
    minWidth: 100,
    marginTop: 36,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 16,
  },
  orderItem: {
    backgroundColor: Colors.accent,
    borderColor: Colors.primary,
    marginRight: 8,
    borderRadius: 2,
    padding: 8,
  },
  tableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
