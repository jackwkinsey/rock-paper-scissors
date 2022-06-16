import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGameDataContext } from '../../context/gameData';
import styles from '../../styles/Home.module.css';

export default function Game() {
  const [games, setGames, loading, setLoading] = useGameDataContext();
  const [currentPlayer, setCurrentPlayer] = useState('playerOne');
  const [choices, setChoices] = useState({
    playerOne: null,
    playerTwo: null,
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    calculateWinner();

    // hack: when coming to this page from home, loading gets set to true due to the context
    // but the data is loaded already so flip the loading switch.
    // This only seems to happen on the first game that gets created and navigated to oddly enough.
    if (games[id]) {
      setLoading(false);
    }
  });

  let game, playerOne, playerTwo;

  if (!loading && games[id]) {
    game = games[id];
    playerOne = game.players.playerOne;
    playerTwo = game.players.playerTwo;
  }

  const resetChoices = () => {
    setChoices({
      playerOne: null,
      playerTwo: null,
    });
  };

  const incrementWins = winningPlayer => {
    resetChoices();
    const players = game.players;
    const winner = players[winningPlayer];
    const wins = (winner.wins += 1);
    const updatedGameData = {
      players: {
        ...players,
        [winningPlayer]: {
          ...winner,
          wins,
        },
      },
    };

    setGames({
      ...games,
      [id]: updatedGameData,
    });
  };

  const calculateWinner = () => {
    const playerOneChoice = choices.playerOne;
    const playerTwoChoice = choices.playerTwo;

    if (!playerOneChoice || !playerTwoChoice) {
      return;
    }

    if (playerOneChoice === playerTwoChoice) {
      resetChoices();
      alert('DRAW! Play again!');
      return;
    }

    switch (playerOneChoice) {
      case 'rock':
        if (playerTwoChoice === 'scissors') {
          incrementWins('playerOne');
        } else {
          incrementWins('playerTwo');
        }
        break;
      case 'paper':
        if (playerTwoChoice === 'rock') {
          incrementWins('playerOne');
        } else {
          incrementWins('playerTwo');
        }
        break;
      case 'scissors':
        if (playerTwoChoice === 'paper') {
          incrementWins('playerOne');
        } else {
          incrementWins('playerTwo');
        }
      default:
        break;
    }
  };

  const choose = event => {
    setChoices({
      ...choices,
      [currentPlayer]: event.target.value,
    });
    setCurrentPlayer(currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne');
  };

  return (
    <div className={styles.main}>
      <h1>Rock, Paper, Scissors</h1>
      {loading || !games[id] ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={styles.grid}>
            <div>{playerOne.name}</div>
            <div>VS</div>
            <div>{playerTwo.name}</div>
          </div>
          <div className={styles.grid}>
            <div>{playerOne.wins}</div>
            <div></div>
            <div>{playerTwo.wins}</div>
          </div>
          <div className={styles.game}>
            <p>{currentPlayer === 'playerOne' ? playerOne.name : playerTwo.name}, select your choice:</p>
            <div className={styles.gameChoices}>
              <button value="rock" onClick={choose}>
                Rock
              </button>
              <button value="paper" onClick={choose}>
                Paper
              </button>
              <button value="scissors" onClick={choose}>
                Scissors
              </button>
            </div>
          </div>
          <div className={styles.navFooter}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
