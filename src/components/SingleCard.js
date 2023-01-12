import React from "react";

const SingleCard = ({ card, handleClick, flipped }) => {
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt={card.src} />
        <img
          className="back"
          src="/img/background.svg"
          onClick={() => handleClick(card)}
          alt="background"
        />
      </div>
    </div>
  );
};

export default SingleCard;
