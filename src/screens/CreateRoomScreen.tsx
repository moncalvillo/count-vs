// src/screens/CreateRoomScreen.tsx

import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, IconButton, TextInput, Title } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { createRoom } from "../../services/room.service";
import { getSession } from "../../services/session.service";
import { RootStackParamList } from "../types";

type CreateRoomScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CreateRoom"
>;

const CreateRoomScreen = () => {
  const navigation = useNavigation<CreateRoomScreenNavigationProp>();
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleCreateRoom = async () => {
    const session = await getSession();
    if (!session) {
      console.error("No session found");
      return;
    }
    const roomDetails = {
      name: roomName,
      description,
      capacity: parseInt(capacity, 10),
      participants: [
        {
          id: session.userId,
          username: session.username,
          score: 0,
          isCurrent: true,
        },
      ],
    };
    try {
      const roomCode = await createRoom(roomDetails);
      navigation.navigate("Room", {
        code: roomCode,
        name: roomName,
        description,
        capacity: parseInt(capacity, 10),
      });
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={20}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      </View>
      <Title style={styles.title}>Create a New Room</Title>
      <TextInput
        label="Room Name"
        value={roomName}
        onChangeText={setRoomName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        mode="outlined"
        multiline
      />
      <TextInput
        label="Capacity"
        value={capacity}
        onChangeText={setCapacity}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />
      <Button mode="contained" onPress={handleCreateRoom} style={styles.button}>
        Generate Room
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1C1C1C",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    color: "#E0E0E0",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#2D2D2D",
  },
  button: {
    backgroundColor: "#F44336",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#F44336",
  },
});

export default CreateRoomScreen;
