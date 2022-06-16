import { useRouter } from 'next/router';
import { useGameDataContext } from '../../context/gameData';

export default function Game() {
  const [games] = useGameDataContext();
  const router = useRouter();
  const { id } = router.query;

  const thisGame = games[id];

  return (
    <h1>
      Game: {id}, {thisGame.players.playerOne.name} vs. {thisGame.players.playerTwo.name}
    </h1>
  );
}
