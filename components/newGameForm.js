import { useState } from 'react';
import uniqid from 'uniqid';

export default function NewGameForm(props) {
  const [newGameData, setNewGameData] = useState({
    playerOneName: '',
    playerTwoName: '',
  });

  const handleNewGameClick = () => {
    const { playerOneName, playerTwoName } = newGameData;
    const newGameId = uniqid();
    const newGame = {
      date_created: new Date(),
      round: 1,
      players: {
        playerOne: {
          name: playerOneName,
          wins: 0,
        },
        playerTwo: {
          name: playerTwoName,
          wins: 0,
        },
      },
    };

    // Reset form
    setNewGameData({
      playerOneName: '',
      playerTwoName: '',
    });

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
    <div>
      <h2>Create a new game</h2>
      <label>
        Player One Name
        <input type="text" name="playerOneName" value={newGameData.playerOneName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Player Two Name
        <input type="text" name="playerTwoName" value={newGameData.playerTwoName} onChange={handleChange} />
      </label>
      <br />
      <button onClick={handleNewGameClick} type="button">
        Create New Game
      </button>
    </div>
  );
}
