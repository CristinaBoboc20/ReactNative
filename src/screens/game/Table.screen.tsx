import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GameRouteNames } from "../../router/route-names";
import { useGame } from "../../hooks/gameContext";
import { useAuth } from "../../hooks/authContext";
import styled from "styled-components/native";
import BattleshipBoard from "../../components/BattleBoard";
const GameItem = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const TableScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { games, currentGame, createGame, getAllGames, joinGame } = useGame();
  const [showBoard, setShowBoard] = useState(false);
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      await getAllGames();
      setLoading(false);
    };
    fetchGames();
  }, []);

  const handleCreateGame = async () => {
    try {
      setLoading(true);
      console.log("Attempting to create game...");
      await createGame();
      setError(null);
      setLoading(false);
      navigation.navigate(GameRouteNames.GAME_BOARD); 
    } catch (e) {
      console.error("Error creating game:", e);
      setError("Failed to create game. Please try again.");
      setLoading(false);
    }
  };

  const handleJoinGame = async (id: string) => {
    setLoading(true);
    try {
      await joinGame(id);
      setLoading(false);
      navigation.navigate(GameRouteNames.GAME_BOARD); // Navigate to GameBoardScreen
    } catch (e) {
      console.error("Error joining game:", e);
      setError("Failed to join game. Please try again.");
      setLoading(false);
    }
  };

  const handleShowBoard = () => {
    setShowBoard(true);
  };

  // only 5 games will be displayed
  const limitedGames = games.slice(0, 5);

  return (
    <View>
      <Text>Game</Text>
      <Button title="Create New Game" onPress={handleCreateGame} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      {currentGame && !showBoard && (
        <TouchableOpacity onPress={handleShowBoard}>
          <View
            style={{
              padding: 20,
              margin: 20,
              backgroundColor: "#ccc",
              borderRadius: 5,
            }}
          >
            <Text>ID: {currentGame.id}</Text>
            <Text>Status: {currentGame.status}</Text>
          </View>
        </TouchableOpacity>
      )}
      {showBoard && <BattleshipBoard />}
      <FlatList
        data={limitedGames}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GameItem>
            <Text>ID: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Button title="Join Game" onPress={() => handleJoinGame(item.id)} />
          </GameItem>
        )}
      />
      <Button
        title="Go to User Details"
        onPress={() => navigation.navigate(GameRouteNames.USER_DETAILS)}
      />
    </View>
  );
};

export default TableScreen;
