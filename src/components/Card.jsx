import React from "react";
import { Image } from "react-bootstrap";

const Card = ({ card, className }) => (
  <Image className={className} src={`assets/cards/${card}.svg`} width={90} />
);

export default Card;
