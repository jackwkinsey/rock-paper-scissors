import { GameDataProvider } from '../context/gameData';
import '../styles/globals.css';

function RockPaperScissorsApp({ Component, pageProps }) {
  return (
    <GameDataProvider>
      <Component {...pageProps} />
    </GameDataProvider>
  );
}

export default RockPaperScissorsApp;
