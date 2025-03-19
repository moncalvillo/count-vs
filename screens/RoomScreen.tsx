import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";

type RoomScreenProps = NativeStackScreenProps<RootStackParamList, "Room">;

const RoomScreen = ({ route, navigation }: RoomScreenProps) => {
  const { roomCode } = route.params;
  const [points, setPoints] = useState<number>(0);

  const addPoints = () => setPoints(points + 1);
  const subtractPoints = () => setPoints(points - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room Code: {roomCode}</Text>
      <Text style={styles.points}>Points: {points}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Add Point" onPress={addPoints} />
        <Button title="Subtract Point" onPress={subtractPoints} />
      </View>
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
  points: { fontSize: 20, marginVertical: 20 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
});

export default RoomScreen;
