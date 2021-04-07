import React, {createContext, useReducer} from 'react';

const aTypes = Object.freeze({
  SET_FORM_MODAL: 'SET_FORM_MODAL',
  SET_PLAYERS_COUNT: 'SET_PLAYERS_COUNT',
  SET_WINNING_SCORE: 'SET_WINNING_SCORE',
  SET_PLAYERS_LIST: 'SET_PLAYERS_LIST',
  SET_ROUND_INFO: 'SET_ROUND_INFO',
  SET_DICE: 'SET_DICE',
  SET_ROUND_INDEX: 'SET_ROUND_INDEX',
  SET_SHAKE: 'SET_SHAKE',
  SET_FTUE: 'SET_FTUE',
});

const initialState = {
  gameFormVisible: true,
  playersCount: 0,
  winningScore: 0,
  playersList: [],
  roundInfoVisible: false,
  diceFace: 0,
  roundIndex: 0,
  shake: false,
  ftue: true,
};
const reducer = (state, action) => {
  switch (action.type) {
    case aTypes.SET_FORM_MODAL:
      return {
        ...state,
        gameFormVisible: action?.payload?.visible,
      };
    case aTypes.SET_PLAYERS_COUNT:
      return {
        ...state,
        playersCount: action?.payload?.playersCount ?? 0,
      };
    case aTypes.SET_WINNING_SCORE:
      return {
        ...state,
        winningScore: action?.payload?.winningScore ?? 0,
      };
    case aTypes.SET_PLAYERS_LIST:
      return {
        ...state,
        playersList: action?.payload?.playersList ?? [],
      };
    case aTypes.SET_ROUND_INFO:
      return {
        ...state,
        roundInfoVisible: action?.payload?.visible,
      };
    case aTypes.SET_DICE:
      return {
        ...state,
        diceFace: action?.payload?.diceFace,
      };
    case aTypes.SET_ROUND_INDEX:
      return {
        ...state,
        roundIndex: action?.payload?.roundIndex,
      };
    case aTypes.SET_SHAKE:
      return {
        ...state,
        shake: action?.payload?.shake,
      };
    case aTypes.SET_FTUE:
      return {
        ...state,
        ftue: action?.payload?.ftue,
      };
    default:
      return state;
  }
};

const storeContext = createContext(initialState);
const {Provider} = storeContext;

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

export {storeContext, StateProvider, aTypes};
