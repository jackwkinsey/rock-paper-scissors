import { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

export function GameDataProvider({ children }) {
  const [games, setGames] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('games')) {
      setGames(JSON.parse(localStorage.getItem('games')));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(games).length) {
      localStorage.setItem('games', JSON.stringify(games));
    }
  }, [games]);

  return <Context.Provider value={[games, setGames, loading, setLoading]}>{children}</Context.Provider>;
}
export function useGameDataContext() {
  return useContext(Context);
}
