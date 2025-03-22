import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { Participant, RoomData, RootStackParamList } from "../types";
import { clearSession, getSession } from "../../services/session.service";
import { getRooms } from "../../services/room.service";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [rooms, setRooms] = useState<RoomData[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      // Obtener la sesión actual para conocer el userId
      const session = await getSession();
      if (!session) return;
      const allRooms: RoomData[] = await getRooms(session.userId);
      // Filtrar las salas en las que el usuario actual figura en el array de participantes
      const userRooms = allRooms.filter(
        (room) =>
          room.participants &&
          room.participants.some((p: Participant) => p.id === session.userId)
      );
      setRooms(userRooms);
    };

    fetchRooms();
  }, []);

  const renderRoom = ({ item }: { item: RoomData }) => {
    // Mostrar el nombre de la sala si existe; si no, el código.
    const titleText =
      item.name && item.name.trim().length > 0 ? item.name : item.code;
    // Contar los participantes actuales
    const participantCount = item.participants ? item.participants.length : 0;
    const participantsText = `${participantCount}/${item.capacity}`;
    return (
      <Card
        style={styles.card}
        onPress={() =>
          navigation.navigate("Room", {
            code: item.code,
            name: item.name,
            description: item.description,
            capacity: item.capacity,
          })
        }
      >
        <Card.Content>
          <View style={styles.titleRow}>
            <Title style={styles.cardTitle} numberOfLines={1}>
              {titleText}
            </Title>
            <Paragraph style={styles.cardParticipants} numberOfLines={1}>
              {participantsText}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>My Rooms</Title>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.code}
        renderItem={renderRoom}
        style={styles.list}
      />
      <View style={styles.buttonsRow}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("JoinRoom")}
          style={styles.halfButton}
          contentStyle={styles.buttonContent}
          icon="account-plus"
          textColor="#000"
        >
          Join
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("CreateRoom")}
          style={styles.halfButton}
          contentStyle={styles.buttonContent}
          icon="plus"
          textColor="#000"
        >
          Create
        </Button>
      </View>
      {/*
      <Button
        mode="outlined"
        onPress={() => {
          clearSession();
        }}
        contentStyle={styles.buttonContent}
      >
        <Title>Delete data</Title>
      </Button>
      */}
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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#F44336",
    flex: 1,
  },
  cardParticipants: {
    color: "#E0E0E0",
    marginLeft: 10,
    textAlign: "right",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfButton: {
    width: "48%",
    backgroundColor: "#F44336",
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default HomeScreen;
