import React from 'react';
import { View, Text } from 'react-native';
import BattleshipBoard from '../../components/BattleBoard';
import { useGame } from '../../hooks/gameContext';

const GameBoardScreen: React.FC = () => {
  const { currentGame } = useGame();

  if (!currentGame) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Game ID: {currentGame.id}</Text>
      <Text>Status: {currentGame.status}</Text>
      <BattleshipBoard />
    </View>
  );
};

export default GameBoardScreen;
