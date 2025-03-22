import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  MD3DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { getSession } from "./services/session.service";
import AppNavigator from "./src/navigation/AppNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#F44336",
    accent: "#FFC107",
    background: "#1C1C1C",
    surface: "#2D2D2D",
    text: "#E0E0E0",
  },
};

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [sessionExists, setSessionExists] = React.useState(false);

  React.useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      setSessionExists(!!session);
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F44336" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {sessionExists ? (
        <AppNavigator />
      ) : (
        <AuthNavigator onSessionSaved={() => setSessionExists(true)} />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
