import React, { useEffect, useState } from "react";
import { Container, Col, Row, Badge, Image } from "react-bootstrap";
import Card from "./Card";

const Player = ({
  player,
  hasTurn,
  isDealer,
  options,
  onSelectOption,
  clearLastAction,
}) => {
  const [lastAction, setLastAction] = useState(undefined);
  useEffect(() => {
    if (player.lastAction && !lastAction && clearLastAction) {
      setLastAction(player.lastAction);
      clearLastAction();
      setTimeout(() => {
        setLastAction(undefined);
      }, 2000);
    }
  }, [player.lastAction, lastAction]);
  return (
    <Container>
      <Row>
        <Col sm={12} className="text-center" style={{ height: "40px" }}>
          {hasTurn && (
            <h5>
              <Badge>Turno</Badge>
            </h5>
          )}
        </Col>

        <Col sm={12} className="text-center">
          {player.cards?.map((c) => (
            <Card
              key={c.card}
              card={c.shown ? c.card : "back"}
              className="mx-2"
            />
          ))}
        </Col>
        <Col sm={12} className="text-center mt-2 mb-1">
          {player.isWinner && <Image src={"crown.svg"} width="30px" />}
        </Col>
        <Col sm={12} className="text-center mb-2">
          <Image src={player.isHuman ? "user.svg" : "brain.svg"} width="60px" />
        </Col>
        <Col sm={12} className="text-center mb-2 font-weight-bold text-white">
          <span>{player.name}</span>
          {isDealer && <Badge className="mx-1">Dealer</Badge>}
        </Col>
        <Col sm={12}>
          <h5 className="text-center text-light">
            Dinero Disponible:
            <Badge bg="light" text="dark" className="mx-2">
              {player.availableMoney} $
            </Badge>
          </h5>
        </Col>
        <Col sm={12}>
          <h6 className="text-center text-light">
            Bet:
            <Badge bg="light" text="dark" className="mx-2">
              {player.bet} $
            </Badge>
          </h6>
        </Col>
        {lastAction && (
          <Col>
            <h6 className="text-center text-light">{lastAction}</h6>
          </Col>
        )}
        {player.isHuman && hasTurn && (
          <Col sm={12} className="d-flex justify-content-around mt-1 px-5">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onSelectOption(opt);
                }}
                className="btn btn-dark"
              >
                {opt}
              </button>
            ))}
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Player;
