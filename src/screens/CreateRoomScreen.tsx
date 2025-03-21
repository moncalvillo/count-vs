import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Button, TextInput, Title } from "react-native-paper";

type CreateRoomScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CreateRoom"
>;

const generateRoomCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const CreateRoomScreen = () => {
  const navigation = useNavigation<CreateRoomScreenNavigationProp>();

  const [roomName, setRoomName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");

  const handleCreateRoom = () => {
    const roomCode = generateRoomCode();
    // Aquí puedes agregar la lógica para crear la sala en Firebase
    navigation.navigate("Room", {
      roomCode,
      roomName,
      roomDescription: description,
      roomCapacity: parseInt(capacity, 10),
    });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Create a New Room</Title>
      <TextInput
        label="Room Name"
        value={roomName}
        onChangeText={setRoomName}
        style={styles.input}
        mode="outlined"
        textColor="#E0E0E0"
        theme={{
          colors: {
            primary: "#F44336",
            placeholder: "#E0E0E0",
          },
        }}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        mode="outlined"
        multiline
        textColor="#E0E0E0"
        theme={{
          colors: {
            primary: "#F44336",
            placeholder: "#E0E0E0",
          },
        }}
      />
      <TextInput
        label="Capacity"
        value={capacity}
        onChangeText={setCapacity}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
        textColor="#E0E0E0"
        theme={{
          colors: {
            primary: "#F44336",
            placeholder: "#E0E0E0",
          },
        }}
      />
      <Button
        mode="contained"
        onPress={handleCreateRoom}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
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
  buttonContent: {
    paddingVertical: 8,
  },
});

export default CreateRoomScreen;
