import "./App.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Table from "./components/Table";
import NavBar from "./components/NavBar";
import GameConfig from "./components/GameConfig";

function App() {
  return (
    <>
      <NavBar />
      <Container className="py-3">
        <h3>Tablero de Juego</h3>
        <hr />
        <Row>
          <Col sm={12}>
            <Table />
          </Col>
        </Row>
        <Col sm={12} className="border rounded p-2 mr-2">
          <GameConfig />
        </Col>
      </Container>
    </>
  );
}

export default App;
