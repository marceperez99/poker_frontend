import "./App.css";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Table from "./components/Table";
import NavBar from "./components/NavBar";
import GameConfig from "./components/GameConfig";
import useGame from "./hooks/useGame";
import usePlayer from "./hooks/usePlayer";

function App() {
  const game = useGame();
  // player 1
  const player1 = usePlayer({});

  // player 2
  const player2 = usePlayer({ showCards: true });

  useEffect(() => {
    if (!game.state.ongoingGame) {
      return;
    }
    (async () => {
      const turn = game.state.turn;
      if (!game.state.ongoingGame) return;
      if (turn === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (await player1.playAutomatically(game)) {
          game.finishTurn(player1, player2);
        } else {
          game.finishGame(player1, player2, "p1");
        }
      } else {
        if (!player2.player.isHuman) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          if (await player2.playAutomatically(game)) {
            game.finishTurn(player1, player2);
          } else {
            game.finishGame(player1, player2, "p2");
          }
        }
      }
    })();
  }, [game.state.turn]);
  useEffect(() => {
    game.checkWinner(player1, player2);
  }, [game.state]);
  return (
    <>
      <NavBar />
      <Container className="py-3">
        <h3>Tablero de Juego</h3>
        <hr />
        <Row>
          <Col sm={12}>
            {game.state.ongoingGame !== undefined && (
              <Table
                game={game}
                turn={game.state.turn}
                player1={player1}
                player2={player2}
                tableCards={game.state.tableCards}
                dealer={game.state.dealer}
              />
            )}
          </Col>
        </Row>
        <Col sm={12} className="border rounded p-2 mr-2">
          <GameConfig
            gameState={game.state}
            game={game}
            player1={player1}
            player2={player2}
          />
        </Col>
      </Container>
    </>
  );
}

export default App;
