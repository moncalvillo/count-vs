import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";

const generateRoomCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

type CreateRoomScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CreateRoom"
>;

const CreateRoomScreen = () => {
  const navigation = useNavigation<CreateRoomScreenNavigationProp>();

  const handleCreateRoom = () => {
    const roomCode = generateRoomCode();
    // Aquí puedes agregar la lógica para crear la sala en Firebase
    navigation.navigate("Room", { roomCode });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Room</Text>
      <Button title="Generate Room" onPress={handleCreateRoom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 24, marginBottom: 20 },
});

export default CreateRoomScreen;
