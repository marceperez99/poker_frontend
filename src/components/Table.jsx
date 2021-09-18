import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CARD_LIST, PHASE_LIST } from "../utils/constants";
import { shuffle_array } from "../utils/utils";
import Card from "./Card";
import Player from "./Player";

const Table = ({ game, player1, player2, turn, dealer, tableCards }) => {
  return (
    <Container className="border rounded mb-3 p-3 bg-success">
      <Row>
        <Col sm={6} className="h4 text-light">
          Fase: {game.state.phase}
        </Col>
        <Col sm={6} className="h4 text-light text-right">
          Pozo: {game.state.shownPot} $
        </Col>

        <Col sm={12} className="d-flex justify-content-center my-4">
          {tableCards.map((c) => (
            <Card
              key={c.card}
              card={c.shown ? c.card : "back"}
              className="mx-2"
            />
          ))}
        </Col>
        <hr className="col-12" />
        <Col sm={6}>
          <Player
            player={player1.player}
            hasTurn={turn === 0}
            isDealer={dealer === 0}
            clearLastAction={player1.clearLastAction}
          />
        </Col>
        <Col sm={6}>
          <Player
            player={player2.player}
            hasTurn={turn === 1}
            isDealer={dealer === 1}
            options={game.getOptions()}
            clearLastAction={
              !player2.player.isHuman ? player1.clearLastAction : null
            }
            onSelectOption={(decision) => {
              if (player2.play(game, decision)) {
                game.finishTurn(player1, player2);
              } else {
                game.finishGame();
              }
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Table;
