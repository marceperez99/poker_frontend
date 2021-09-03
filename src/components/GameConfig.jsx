import React from "react";
import { Container, Form, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const GameConfig = ({}) => {
  return (
    <Container>
      <h4>Parametros del Juego</h4>
      <Row>
        <Form.Group className="col-6">
          <Form.Label>Modo de Juego</Form.Label>
          <Form.Select>
            <option>Computadora vs Computadora</option>
            <option>Computadora vs Jugador</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-6">
          <Form.Label>Valor de Q de la Computadora</Form.Label>
          <Form.Control type="text" placeholder="Normal text" />
        </Form.Group>
        <Form.Group className="col-6">
          <Form.Label>Monto Inicial a Apostar</Form.Label>
          <Form.Control type="text" placeholder="Normal text" />
        </Form.Group>
      </Row>
    </Container>
  );
};

export default GameConfig;
