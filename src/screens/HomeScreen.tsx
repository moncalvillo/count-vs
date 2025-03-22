import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { RootStackParamList } from "../types";
import { clearSession } from "../../services/session.service";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface Room {
  id: string;
  code: string;
  name?: string;
  description?: string;
  capacity?: number;
}

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    setRooms([
      { id: "1", code: "ABC123" },
      { id: "2", code: "DEF456" },
    ]);
  }, []);

  const renderRoom = ({ item }: { item: Room }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate("Room", { roomCode: item.code })}
    >
      <Card.Content>
        <Title style={styles.cardTitle}>Room: {item.code}</Title>
        <Paragraph style={styles.cardParagraph}>A duel awaits...</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.title}>My Rooms</Title>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={renderRoom}
        style={styles.list}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("CreateRoom")}
        style={styles.createButton}
        contentStyle={styles.buttonContent}
      >
        Create New Room
      </Button>
      <Button
        mode="outlined"
        onPress={() => {
          clearSession();
        }}
        contentStyle={styles.buttonContent}
      >
        <Title>Delete data</Title>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1C1C1C",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    color: "#E0E0E0",
  },
  list: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 15,
    backgroundColor: "#2D2D2D",
  },
  cardTitle: {
    color: "#F44336",
  },
  cardParagraph: {
    color: "#FFFFFF",
  },
  createButton: {
    backgroundColor: "#F44336",
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default HomeScreen;
