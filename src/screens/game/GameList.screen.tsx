import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { useGame } from "../../hooks/gameContext";

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const GameItem = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const GameListScreen: React.FC = () => {
  const { games, getAllGames, createGame, joinGame, currentGame } = useGame();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      await getAllGames();
      setLoading(false);
    };
    fetchGames();
  }, []);

  const handleCreateGame = async () => {
    setLoading(true);
    await createGame();
    setLoading(false);
  };

  const handleJoinGame = async (id: string) => {
    setLoading(true);
    await joinGame(id);
    setLoading(false);
  };

  return (
    <Container>
      <Button title="Create New Game" onPress={handleCreateGame} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GameItem>
            <Text>ID: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Button title="Join Game" onPress={() => handleJoinGame(item.id)} />
          </GameItem>
        )}
      />
      {currentGame && (
        <View>
          <Text>Current Game:</Text>
          <Text>ID: {currentGame.id}</Text>
          <Text>Status: {currentGame.status}</Text>
        </View>
      )}
    </Container>
  );
};

export default GameListScreen;
