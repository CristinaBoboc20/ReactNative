import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { useGame } from '../hooks/gameContext';

const GridContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

const Cell = styled.TouchableOpacity<{ isShip: boolean; isHit: boolean }>`
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  background-color: ${({ isShip, isHit }) => (isHit ? (isShip ? 'red' : 'blue') : 'white')};
  align-items: center;
  justify-content: center;
`;

const BattleshipBoard: React.FC = () => {
  const { currentGame } = useGame();
  const [board, setBoard] = useState(Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ({ isShip: false, isHit: false }))));

  useEffect(() => {
    if (currentGame && currentGame.moves) {
      const newBoard = [...board];
      currentGame.moves.forEach(({ x, y, result }) => {
        const rowIndex = y;
        const colIndex = x.charCodeAt(0) - 65;
        newBoard[rowIndex][colIndex] = { ...newBoard[rowIndex][colIndex], isHit: true };
      });
      setBoard(newBoard);
    }
  }, [currentGame]);

  if (!currentGame) {
    return <Text>Loading...</Text>;
  }

  return (
    <GridContainer>
      {board.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              isShip={cell.isShip}
              isHit={cell.isHit}
            >
              <Text>{cell.isHit ? (cell.isShip ? 'X' : 'O') : ''}</Text>
            </Cell>
          ))}
        </Row>
      ))}
    </GridContainer>
  );
};

export default BattleshipBoard;
