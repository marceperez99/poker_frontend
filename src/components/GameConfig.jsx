import React, { useState } from "react";
import { Button, Container, Form, Row, Col, InputGroup } from "react-bootstrap";
import { CARD_LIST, GAME_MODES } from "../utils/constants";
import { shuffle_array } from "../utils/utils";

const GameConfig = ({ game, player1, player2 }) => {
  const [config, _setConfig] = useState({
    smallBlind: 10,
    bigBlind: 20,
    gameMode: GAME_MODES.MVSH,
    computerQ1: 0.1,
    initialMoney: 1000,
  });
  const setConfig = (field, value) =>
    _setConfig((prev) => ({ ...prev, [field]: value }));
  return (
    <Container>
      <h4>Parametros del Juego</h4>
      <Row>
        <Form.Group className="col-6">
          <Form.Label>Modo de Juego</Form.Label>
          <Form.Select
            disabled={config.ongoingGame}
            value={config.gameMode}
            onChange={(opt) => setConfig("gameMode", opt.target.value)}
          >
            <option defaultValue>Seleccione un Modo</option>
            {Object.entries(GAME_MODES).map(([key, value]) => (
              <option value={value} key={key}>
                {value}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-6">
          <Form.Label>Monto Disponible para Apostar</Form.Label>
          <InputGroup className="col-6">
            <Form.Control
              disabled={config.ongoingGame}
              value={config.initialMoney}
              type="number"
              placeholder=""
              aria-describedby={"montoApuesta"}
              onChange={(opt) =>
                setConfig("initialMoney", parseInt(opt.target.value))
              }
            />
            <InputGroup.Text id="montoApuesta">$</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className="col-6 mt-2">
          <Form.Label>Small Blind</Form.Label>
          <InputGroup className="col-6">
            <Form.Control
              type="number"
              disabled={config.ongoingGame}
              value={config.smallBlind}
              placeholder=""
              onChange={(opt) => {
                setConfig("smallBlind", parseInt(opt.target.value));
                setConfig("bigBlind", parseInt(opt.target.value) * 2);
              }}
            />
            <InputGroup.Text id="montoApuesta">$</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className="col-6 mt-2">
          <Form.Label>Big Blind</Form.Label>
          <InputGroup className="col-6">
            <Form.Control
              type="number"
              value={config.bigBlind}
              disabled
              placeholder=""
            />
            <InputGroup.Text id="montoApuesta">$</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className="col-6 mt-2">
          <Form.Label>Valor de Q de la Computadora 1</Form.Label>
          <Form.Control
            type="number"
            min={0}
            max={1}
            value={config.computerQ1}
            disabled={config.ongoingGame}
            placeholder=""
            onChange={(opt) =>
              setConfig("computerQ1", parseFloat(opt.target.value))
            }
          />
        </Form.Group>
        {config.gameMode === GAME_MODES.MVSM && (
          <Form.Group className="col-6 mt-2">
            <Form.Label>Valor de Q de la Computadora 2</Form.Label>
            <Form.Control
              type="number"
              disabled={config.ongoingGame}
              value={config.computerQ2}
              placeholder=""
              onChange={(opt) =>
                setConfig("computerQ2", parseFloat(opt.target.value))
              }
            />
          </Form.Group>
        )}
        <Col sm={12} className={"d-flex justify-content-center py-3"}>
          <Button
            disabled={
              config.ongoingGame ||
              !config.gameMode ||
              !config.computerQ1 ||
              (config.gameMode === GAME_MODES.MVSM && !config.computerQ2)
            }
            onClick={() => {
              player1.isComputer();
              player1.setStrategy(config.computerQ1);
              if (config.gameMode === GAME_MODES.MVSM) {
                player2.isComputer();
                player2.setStrategy(config.computerQ2);
              } else {
                player2.isHuman();
              }
              player1.setMoney(config.initialMoney);
              player2.setMoney(config.initialMoney);

              const cards = shuffle_array([...CARD_LIST]);
              player1.setHand(cards.slice(0, 2));
              player2.setHand(cards.slice(2, 4));

              game.setTableCards(
                cards.slice(4, 9).map((card) => ({ card, shown: false }))
              );

              const dealer = game.initGame(
                config.smallBlind,
                config.initialMoney,
                2 * config.smallBlind,
                3 * config.smallBlind,
                cards.slice(4, 9).map((card) => ({ card, shown: false }))
              );
              if (dealer === 0) {
                player1.bet(config.smallBlind, game);
                player2.bet(2 * config.smallBlind, game);
              } else {
                player2.bet(config.smallBlind, game);
                player1.bet(2 * config.smallBlind, game);
              }
              game.startGame();
            }}
          >
            Comenzar Juego
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default GameConfig;
