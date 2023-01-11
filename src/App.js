import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/Video.png", matched: false },
  { src: "/img/Trash.png", matched: false },
  { src: "/img/Target.png", matched: false },
  { src: "/img/Rocket.png", matched: false },
  { src: "/img/Bulb.png", matched: false },
  { src: "/img/Chess.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const [stopInter, setStopInter] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
    setClickCount(0);
    setMatchCount(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleClick = (card) => {
    if (!stopInter) {
      if (!choiceOne) {
        setChoiceOne(card);
        console.log("setChoiceOne", card.src);
      } else {
        setChoiceTwo(card);
        console.log("setChoiceTwo", card.src);
        setTurns((prevTurns) => prevTurns + 1);
      }
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setStopInter(true);
      if (choiceOne.src === choiceTwo.src) {
        console.log("ITS A MATCH!");

        choiceOne.matched = true;
        choiceTwo.matched = true;

        setMatchCount(matchCount + 1);
        if (matchCount === 6) {
          setMatchCount(0);
        }
      } else {
        console.log("ITS NOT A MATCH!");
      }
      setClickCount(clickCount + 1);

      setTimeout(() => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(0);
        setStopInter(false);
      }, 1500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  console.log(cards, turns);
  return (
    <div className="App">
      <h1>Matches!</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="clickCount">Tries: {clickCount}</div>
      <div className="matchCount">Matches: {matchCount}</div>

      <div className="card-grid">
        {cards &&
          cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              handleClick={handleClick}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
