// src/screens/UsernameScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { saveSession, Session } from "../../services/session.service";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../types";

interface UsernameScreenProps {
  onSessionSaved: () => void;
}

const generateUserId = (): string => {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
};

const AuthScreen = ({ onSessionSaved }: UsernameScreenProps) => {
  const [auth, setAuth] = useState("");

  const handleSaveUsername = async () => {
    if (auth.trim().length === 0) return;
    const session: Session = {
      username: auth.trim(),
      userId: generateUserId(),
    };
    await saveSession(session);
    onSessionSaved();
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Choose your username</Title>
      <TextInput
        label="Username"
        value={auth}
        onChangeText={setAuth}
        style={styles.input}
        mode="outlined"
      />
      <Button
        mode="contained"
        onPress={handleSaveUsername}
        style={styles.button}
      >
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#E0E0E0",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#2D2D2D",
  },
  button: {
    backgroundColor: "#F44336",
  },
});

export default AuthScreen;
