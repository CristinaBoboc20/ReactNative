import React, { createContext, useContext, useState } from "react";
import { createGame, getAllGames, joinGame } from "../api";
import { useAuth } from "./authContext";

interface Game {
  id: string;
  status: string;
  moves: Array<{
    x: string;
    y: number;
    result: boolean;
    playerId: number;
  }>;
  playerToMove: number;
}

interface IGameContext {
  games: Game[];
  currentGame: Game | null;
  createGame: () => Promise<void>;
  getAllGames: () => Promise<void>;
  joinGame: (id: string) => Promise<void>;
}

const GameContext = createContext<IGameContext>({
  games: [],
  currentGame: null,
  createGame: async () => {},
  getAllGames: async () => {},
  joinGame: async () => {},
});

export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useAuth();

  const [games, setGames] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  const handleCreateGame = async () => {
    try {
      if (!token) throw new Error("No token available");
      console.log("Creating game with token:", token);
      const data = await createGame(token);
      setCurrentGame(data);
      setGames((prevGames) => [...prevGames, data]);
      console.log("Game created successfully:", data); 
    } catch (error) {
      console.error("Failed to create game", error);
      throw error; 
    }
  };

  const handleGetAllGames = async () => {
    try {
      if (!token) throw new Error("No token available");
      const data = await getAllGames(token);
      setGames(data.games);
    } catch (error) {
      console.error("Failed to fetch games", error);
    }
  };

  const handleJoinGame = async (id: string) => {
    try {
      if (!token) throw new Error("No token available");
      const data = await joinGame(id, token);
      setCurrentGame(data);
    } catch (error) {
      console.error("Failed to join game", error);
    }
  };

  return (
    <GameContext.Provider
      value={{
        games,
        currentGame,
        createGame: handleCreateGame,
        getAllGames: handleGetAllGames,
        joinGame: handleJoinGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
