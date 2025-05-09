import { useState } from "react";

import "./App.css";
import { useEffect } from "react";

const gameIcons = ["🐶", "🐱", "🧀", "🗿", "🪷", "💎", "🤸🏽‍♀️", "👀", "🌞"];

function App() {
  const [cards, setCards] = useState([]);
  const startGame = () => {
    const duplicateGameIcon = [...gameIcons, ...gameIcons];
    console.log("duplicated icons", duplicateGameIcon);
    const newGameIcons = [];

    while (newGameIcons.length < gameIcons.length * 2) {
      const randomIcon = Math.floor(Math.random() * duplicateGameIcon.length);
      newGameIcons.push({
        emoji: duplicateGameIcon[randomIcon],
        flip: false,
        solved: false,
        position: newGameIcons.length,
      });
      duplicateGameIcon.splice(randomIcon, 1);
    }
    setCards(newGameIcons);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleActive = (data) => {
    const newCard = cards.map((card) => {
      if (card.position === data.position) {
        card.flip = !card.flip;
      }
      return card;
    });
    setCards(newCard);
    console.log(cards);
  };

  const gameLogic = () => {
    // alert('hello')
    const flipedCards = cards.filter((data) => data.flip && !data.solved);
    if (flipedCards.length === 2) {
     setTimeout(()=>{
      if (flipedCards[0].emoji === flipedCards[1].emoji) {
        setCards(
          cards.map((card) => {
            if (
              card.position === flipedCards[0].position ||
              card.position === flipedCards[1].position
            ) {
              card.solved = true;
            }
            return card;
          })
        );
      } else {
        setCards(
          cards.map((card) => {
            if (
              card.position === flipedCards[0].position ||
              card.position === flipedCards[1].position
            ) {
              card.flip = false;
            }
            return card;
          })
        );
      }
     },800)
    }
  };

  const isGameFinish=()=>{
    if(cards.every((card)=>card.solved)){
      Swal.fire({
        title: "🎉 GAME OVER 🎉<br>Congratulations, You Won!",
        html: `
          <h3 style="color: #ff5e57; font-weight: bold;">You matched all the cards</h3>
          
        `,
        width: 700,
        padding: "2em",
        color: "#333",
        background: "#fff url('https://www.transparenttextures.com/patterns/cubes.png')",
        
        confirmButtonText: "Play Again",
        confirmButtonColor: "#ff5e57",
        showClass: {
          popup: "animate__animated animate__fadeInDown"
        },
        
        timer: 8000,
        timerProgressBar: true
      }).then((result)=>{
        if(result.isConfirmed){
          window.location.reload()
        }
      })
      
    }
  }

  useEffect(() => {
    gameLogic();
    if(cards.length>0){
      isGameFinish()
    }
  }, [cards]);

  return (
    <main>
      <h1>Card Game</h1>

      <div className="container">
        {cards.map((data, index) => (
          <div
            className={`flip-card ${data.flip ? "active1" : ""}`}
            key={index}
            onClick={() => handleActive(data)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front"> 🎴 </div>
              <div className="flip-card-back">{data.emoji}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
