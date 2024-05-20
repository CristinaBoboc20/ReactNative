import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GameRouteNames } from "./route-names";
import TableScreen from "../screens/game/Table.screen";
import UserDetailsScreen from "../screens/user/User.screen";
import GameListScreen from "../screens/game/GameList.screen";
import GameBoardScreen from "../screens/game/GameBoard.screen";
import { Text } from "react-native";

const GameStack = createNativeStackNavigator();

const gameRoutes = (
  <GameStack.Navigator>
    <GameStack.Screen
      name={GameRouteNames.TABLE}
      component={TableScreen}
      options={{
        headerTitle: (props) => <Text {...props}>Game</Text>,
      }}
    />
    <GameStack.Screen
      name={GameRouteNames.USER_DETAILS}
      component={UserDetailsScreen}
      options={{
        headerTitle: (props) => <Text {...props}>User Details</Text>,
      }}
    />
    <GameStack.Screen
      name={GameRouteNames.GAME_LIST}
      component={GameListScreen}
      options={{
        headerTitle: (props) => <Text {...props}>Available Games</Text>,
      }}
    />
    <GameStack.Screen
      name={GameRouteNames.GAME_BOARD}
      component={GameBoardScreen} 
      options={{
        headerTitle: (props) => <Text {...props}>Game Board</Text>,
      }}
    />
  </GameStack.Navigator>
);

export default gameRoutes;
