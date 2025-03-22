// src/navigation/AuthNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UsernameScreen from "../screens/UsernameScreen";
import { AuthStackParamList } from "../types";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Username" component={UsernameScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
