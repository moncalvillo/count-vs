import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, IconButton, TextInput, Title } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { getSession } from "../../services/session.service";
import { getRoom, addParticipantToRoom } from "../../services/room.service";
import { Participant } from "../../src/types";

type JoinRoomScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "JoinRoom"
>;

const JoinRoomScreen = () => {
  const navigation = useNavigation<JoinRoomScreenNavigationProp>();
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoinRoom = async () => {
    if (!roomCode.trim()) {
      Alert.alert("Please enter a room code");
      return;
    }

    setLoading(true);
    const code = roomCode.trim().toUpperCase();

    // Get current user's session
    const session = await getSession();
    if (!session) {
      Alert.alert("No session found", "Please set your username first");
      setLoading(false);
      return;
    }

    // Fetch the room from Firestore
    const room = await getRoom(code);
    if (!room) {
      Alert.alert("Room not found", "Please check the room code");
      setLoading(false);
      return;
    }

    // Check if the user is already a participant
    const alreadyJoined = room.participants.some(
      (p: Participant) => p.id === session.userId
    );

    if (!alreadyJoined) {
      try {
        await addParticipantToRoom(code, {
          id: session.userId,
          username: session.username,
          score: 0,
        });
      } catch (error) {
        Alert.alert("Error", "Could not join the room. Please try again.");
        setLoading(false);
        return;
      }
    }

    // Navigate to the Room screen with room details
    navigation.navigate("Room", {
      code: room.code,
      name: room.name,
      description: room.description,
      capacity: room.capacity,
    });
    setLoading(false);
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
      <Title style={styles.title}>Join Room</Title>
      <TextInput
        label="Room Code"
        value={roomCode}
        onChangeText={setRoomCode}
        style={styles.input}
        mode="outlined"
        autoCapitalize="characters"
      />
      <Button
        mode="contained"
        onPress={handleJoinRoom}
        style={styles.button}
        contentStyle={styles.buttonContent}
        loading={loading}
      >
        Join Room
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
  },
  buttonContent: {
    paddingVertical: 8,
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

export default JoinRoomScreen;
