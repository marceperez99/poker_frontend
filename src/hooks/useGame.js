import { useState } from "react";
import { getWinner } from "../api/api";
import { ACTIONS, PHASE } from "../utils/constants";
import stateGraph from "../utils/stateGraph";
const INIT_STATE = {
  tableCards: [],
  ongoingGame: undefined,
  pot: 0,
  shownPot: 0,
  turn: undefined,
  dealer: undefined,
  phase: 0,
  bet: 0,
  turnPassed: false,
  initialChips: 0,
};
const useGame = () => {
  const [state, setGameState] = useState(INIT_STATE);
  const startGame = () =>
    setGameState((prev) => ({ ...prev, ongoingGame: true }));
  const initGame = (smallBlind, initialChips, bet, pot, tableCards) => {
    const buttonPos =
      state.dealer === undefined
        ? Math.floor(Math.random() * 2)
        : (state.dealer + 1) % 2;

    setGameState((prev) => {
      return {
        ...prev,
        ongoingGame: true,
        pot,
        shownPot: 0,
        turn: buttonPos,
        dealer: buttonPos,
        phase: PHASE.PreFlop,
        smallBlind,
        bigBlind: smallBlind * 2,
        bet,
        currState: "D1",
        turnPassed: false,
        initialChips,
        tableCards,
        checkedWinner: false,
      };
    });
    return buttonPos;
  };

  const finishGame = (p1, p2, foldedBy = undefined) => {
    p1.clearBet();
    p2.clearBet();
    setGameState((prev) => {
      if (foldedBy === "p1") {
        p2.setIsWinner(prev.pot);
      } else if (foldedBy === "p2") {
        p1.setIsWinner(prev.pot);
      } else {
        getWinner(
          p1.player.cards.map((c) => c.card),
          p2.player.cards.map((c) => c.card),
          prev.tableCards.map((c) => c.card)
        ).then((winner) => {
          console.log(winner);
          switch (winner) {
            case 0:
              p1.setIsWinner(prev.pot / 2);
              p2.setIsWinner(prev.pot / 2);
              break;
            case 1:
              p1.setIsWinner(prev.pot);
              break;
            case 2:
              p2.setIsWinner(prev.pot);
              break;
          }
        });
      }
      return {
        ...prev,
        ongoingGame: false,
        pot: 0,
        currState: "O9",
        shownPot: 0,
        checkedWinner: true,
      };
    });
  };
  const finishTurn = (player1, player2) =>
    setGameState((prev) => {
      console.log(prev.currState, stateGraph[prev.currState]);
      const currPhase = stateGraph[prev.currState]?.phase;
      if (prev.turnPassed) {
        prev.turnPassed = false;
        prev.shownPot = prev.pot;
        player1.clearBet();
        player2.clearBet();
        prev.bet = 0;
      }
      let cardsList = prev.tableCards;
      const revealCards = (cards, numberOfCards) =>
        cards.map((card, i) => {
          if (i < numberOfCards) return { ...card, shown: true };
          else return card;
        });
      if (currPhase === PHASE.Flop) cardsList = revealCards(prev.tableCards, 3);
      if (currPhase === PHASE.Turn) cardsList = revealCards(prev.tableCards, 4);
      if (currPhase === PHASE.River)
        cardsList = revealCards(prev.tableCards, 5);

      return {
        ...prev,
        turn: (prev.turn + 1) % 2,
        phase: currPhase,
        tableCards: cardsList,
      };
    });

  const hasFinished = () => {
    return state.phase === PHASE.End;
  };
  const setTableCards = (cards) =>
    setGameState((prev) => ({ ...prev, tableCards: cards }));

  const raiseBet = (amount) =>
    setGameState((prev) => ({
      ...prev,
      bet: amount,
    }));

  const getOptions = () => {
    if (!stateGraph[state.currState]?.actions) return [];
    return [ACTIONS.FOLD, ...Object.keys(stateGraph[state.currState].actions)];
  };

  const advance = (option) =>
    setGameState((prev) => {
      const currState = stateGraph[prev.currState]?.actions[option];
      let turnPassed =
        stateGraph[prev.currState]?.phase !== stateGraph[currState]?.phase;

      return {
        ...prev,
        currState,
        turnPassed,
      };
    });

  const addBet = (amount) =>
    setGameState((prev) => ({
      ...prev,
      bet: prev.bet + amount,
    }));
  const addToPot = (amount) =>
    setGameState((prev) => ({
      ...prev,
      pot: prev.pot + amount,
    }));

  const checkWinner = async (player1, player2) => {
    if (
      stateGraph[state.currState]?.phase === PHASE.End &&
      !state.checkedWinner
    ) {
      finishGame(player1, player2);
    }
  };
  return {
    state,
    startGame,
    finishGame,
    hasFinished,
    finishTurn,
    raiseBet,
    setTableCards,
    getOptions,
    advance,
    addBet,
    addToPot,
    initGame,
    checkWinner,
  };
};

export default useGame;
