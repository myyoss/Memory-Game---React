import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/Video.png", matched: false },
  { src: "/img/Trash.png", matched: false },
  { src: "/img/Target.png", matched: false },
  { src: "/img/Rocket.png", matched: false },
  { src: "/img/Bulb.png", matched: false },
  { src: "/img/chess.png", matched: false },
  { src: "/img/Crown.png", matched: false },
  { src: "/img/Headphone.png", matched: false },
  { src: "/img/Locker.png", matched: false },
  { src: "/img/Fire.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const [stopInter, setStopInter] = useState(false);
  const [changeBackground, setChangeBackground] = useState("App");
  const [chooseCardsNumber, setChooseCardsNumber] = useState(6);

  const gameDifficulty = (x) => {
    setChooseCardsNumber(x);
    shuffleCards();
  };

  const shuffleCards = () => {
    const cardsNumber = cardImages.slice(0, chooseCardsNumber);
    const shuffledCards = [...cardsNumber, ...cardsNumber]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
    setClickCount(0);
    setMatchCount(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setChangeBackground("App");
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
        const audio = new Audio("/sounds/bling.mp3");
        audio.play();
        console.log("ITS A MATCH!");

        choiceOne.matched = true;
        choiceTwo.matched = true;

        setMatchCount(matchCount + 1);
      } else {
        console.log("ITS NOT A MATCH!");
        const audio = new Audio("/sounds/harp.mp3");
        audio.play();
      }
      setClickCount(clickCount + 1);

      setTimeout(() => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(0);
        setStopInter(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chooseCardsNumber]);

  useEffect(() => {
    console.log("chooseCardsNumber", chooseCardsNumber);
    if (matchCount === chooseCardsNumber) {
      setChangeBackground("appWin");
      const audio = new Audio("/sounds/win.mp3");
      audio.play();
    }
  }, [matchCount, chooseCardsNumber]);

  console.log(cards, turns);
  return (
    <div className={changeBackground}>
      <h1>Matches!</h1>
      <div className="gamelevel">
        <button onClick={() => gameDifficulty(6)}>Beginners</button>
        <button onClick={() => gameDifficulty(8)}>Medium</button>
        <button onClick={() => gameDifficulty(10)}>Expert</button>
      </div>
      <div className="gameCounts">
        <div className="clickCount">Tries: {clickCount}</div>
        <div className="matchCount">Match: {matchCount}</div>
      </div>
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
