import "react-native-gesture-handler";
import Router from "./src/router";
import { AuthContextProvider } from "./src/hooks/authContext";
import { GameContextProvider } from "./src/hooks/gameContext";
export default function App() {
  return (
    <AuthContextProvider>
      <GameContextProvider>
        <Router />
      </GameContextProvider>
    </AuthContextProvider>
  );
}
