import * as React from "react";
import { Provider as PaperProvider, MD3DarkTheme } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";

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

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}
