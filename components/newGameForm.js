import { useState } from 'react';
import uniqid from 'uniqid';

export default function NewGameForm(props) {
  const [newGameData, setNewGameData] = useState({
    playerOneName: '',
    playerTwoName: '',
  });

  const resetForm = () => {
    setNewGameData({
      playerOneName: '',
      playerTwoName: '',
    });
  };

  const handleNewGameClick = () => {
    const { playerOneName, playerTwoName } = newGameData;
    if (!playerOneName.trim() || !playerTwoName.trim()) {
      resetForm();
      return;
    }
    const newGameId = uniqid();
    const newGame = {
      players: {
        playerOne: {
          name: playerOneName.trim(),
          wins: 0,
        },
        playerTwo: {
          name: playerTwoName.trim(),
          wins: 0,
        },
      },
    };

    resetForm();

    props.submit(newGameId, newGame);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setNewGameData({
      ...newGameData,
      [name]: value,
    });
  };

  return (
    <>
      <h2>Create a new game</h2>
      <label>
        Player One Name <br />
        <input type="text" name="playerOneName" value={newGameData.playerOneName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Player Two Name <br />
        <input type="text" name="playerTwoName" value={newGameData.playerTwoName} onChange={handleChange} />
      </label>
      <br />
      <button onClick={handleNewGameClick} type="button">
        Create New Game
      </button>
    </>
  );
}
