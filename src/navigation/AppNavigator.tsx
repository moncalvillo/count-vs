import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateRoomScreen from "../screens/CreateRoomScreen";
import HomeScreen from "../screens/HomeScreen";
import RoomScreen from "../screens/RoomScreen";

export type RootStackParamList = {
  Home: undefined;
  CreateRoom: undefined;
  Room: {
    roomCode?: string;
    roomName?: string;
    roomDescription?: string;
    roomCapacity?: number;
  };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateRoom" component={CreateRoomScreen} />
      <Stack.Screen name="Room" component={RoomScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
