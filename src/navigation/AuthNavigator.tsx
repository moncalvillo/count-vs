// src/navigation/AuthNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/AuthScreen";
import { AuthStackParamList } from "../types";

interface AuthNavigatorProps {
  onSessionSaved: () => void;
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = ({ onSessionSaved }: AuthNavigatorProps) => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Auth">
        {(props) => <AuthScreen {...props} onSessionSaved={onSessionSaved} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
