import React from "react";
import styled from "styled-components/native";
import { Text, View, ActivityIndicator, Button } from "react-native";

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

interface UserDetailsProps {
  userData: any;
  loading: boolean;
  logout: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ userData, loading, logout }) => {
  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#0000ff" />
      </Container>
    );
  }

  return (
    <Container>
      <Text>User Details</Text>
      {userData ? (
        <View>
          <Text>ID: {userData.user.id}</Text>
          <Text>Email: {userData.user.email}</Text>
          <Text>Games Played: {userData.gamesPlayed}</Text>
          <Text>Games Won: {userData.gamesWon}</Text>
          <Text>Games Lost: {userData.gamesLost}</Text>
          <Text>Currently Playing: {userData.currentlyGamesPlaying}</Text>
        </View>
      ) : (
        <Text>No user data available</Text>
      )}
      <Button title="Logout" onPress={logout} />
    </Container>
  );
};

export default UserDetails;
