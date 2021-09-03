import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row, Image, Badge } from "react-bootstrap";
import { CARD_LIST } from "../utils/constants";
import { shuffle_array } from "../utils/utils";
import Card from "./Card";

const Table = () => {
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [tableCards, setTableCards] = useState([]);

  useEffect(() => {
    const cards = shuffle_array([...CARD_LIST]);
    setPlayer1(cards.slice(0, 2));
    setPlayer2(cards.slice(2, 4));
    setTableCards(cards.slice(4, 9));
  }, []);

  return (
    <Container className="border rounded mb-3 p-3 bg-success">
      <Row>
        <Col sm={2} className="row">
          <div className="col-6">
            <Image src="brain.svg" width="100%" />
          </div>
          <div className="col-6">
            <h5 style={{ fontWeight: "bold" }}>Apuesta</h5>
            <h4>
              <Badge bg="light" text="dark">
                2000 $
              </Badge>
            </h4>
          </div>
        </Col>

        <Col sm={8} className="d-flex justify-content-center my-3">
          {player1.map((c) => (
            <Card card={c} className="mx-2" />
          ))}
        </Col>
        <Col sm={12} className="d-flex justify-content-center my-3">
          {tableCards.map((c) => (
            <Card card={c} className="mx-2" />
          ))}
        </Col>
        <Col sm={8} className="d-flex justify-content-center my-3 offset-2">
          {player2.map((c) => (
            <Card card={c} className="mx-2" />
          ))}
        </Col>
        <Col sm={2} className="row p-0">
          <div className="col-6 align-self-end justify-content-end">
            <h5 style={{ fontWeight: "bold" }}>Apuesta</h5>
            <h4>
              <Badge bg="light" text="dark">
                15000 $
              </Badge>
            </h4>
          </div>
          <div className="col-6 align-self-end d-flex justify-content-end">
            <Image className="" src="user.svg" width="100%" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Table;
