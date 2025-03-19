import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";

interface Room {
  id: string;
  code: string;
}
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    setRooms([{ id: "1", code: "ABC123" }]);
  }, []);

  const renderRoom = ({ item }: { item: Room }) => (
    <View style={styles.roomItem}>
      <Button
        title={`Room: ${item.code}`}
        onPress={() => navigation.navigate("Room", { roomCode: item.code })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Rooms</Text>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={renderRoom}
        style={styles.list}
      />
      <Button
        title="Create New Room"
        onPress={() => navigation.navigate("CreateRoom")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  list: { marginBottom: 20 },
  roomItem: { marginBottom: 10 },
});

export default HomeScreen;
