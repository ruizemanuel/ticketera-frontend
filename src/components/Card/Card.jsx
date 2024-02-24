import "./Card.css";
import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { useSpring, animated } from "react-spring";

function Card({ data }) {
  const { title, description, gifUrl, isDone, difficultyLevel } = data;
  const [show, setShown] = useState(false);

  const getBadgeVariant = () => {
    switch (difficultyLevel) {
      case 'facil':
        return 'success';
      case 'media':
        return 'warning';
      case 'dificil':
        return 'danger';
      default:
        return 'primary';
    }
  };

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)"
  });
  return (
    <animated.div
      className="card"
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img src={gifUrl} alt="" />
      <div className="badge-container">
      <Badge bg={getBadgeVariant()}>{difficultyLevel.toUpperCase()}</Badge>
      <Badge bg={isDone ? 'success' : 'secondary'}>{isDone ? 'FINALIZADA' : 'PENDIENTE'}</Badge>
      </div>
      <h4>{title}</h4>
      <p>
        {description}
      </p>
      <button className="btn btn-primary mx-2">VER DETALLE</button>
    </animated.div>
  );
}

export default Card;
