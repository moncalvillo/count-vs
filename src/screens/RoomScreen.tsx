// src/screens/RoomScreen.tsx

import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Title, Paragraph, Card, IconButton, Button } from "react-native-paper";
import { getRoom, updateRoom } from "../../services/room.service";
import { RoomData, RootStackParamList, Participant } from "../types";
import { getSession } from "../../services/session.service";

type RoomScreenProps = NativeStackScreenProps<RootStackParamList, "Room">;

const RoomScreen = ({ route, navigation }: RoomScreenProps) => {
  const { code, name, description, capacity } = route.params;
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      const data = await getRoom(code);
      if (data) {
        setRoomData(data);
      }
    };
    const getCurrentUserId = async () => {
      const session = await getSession();
      if (session) {
        setCurrentUserId(session.userId);
      }
    };
    getCurrentUserId();
    fetchRoom();
    // Para sincronización en tiempo real, en producción se puede usar onSnapshot.
  }, [code]);

  const updateScoreForCurrentUser = async (increment: number) => {
    if (!roomData) return;
    const currentParticipant = roomData.participants.find(
      (p) => p.id === currentUserId
    );

    if (
      !currentParticipant ||
      currentParticipant.score + increment > 100 ||
      currentParticipant.score + increment < 0
    ) {
      return;
    }

    const updatedParticipants = roomData.participants.map((participant) =>
      participant.id === currentUserId
        ? { ...participant, score: participant.score + increment }
        : participant
    );
    setRoomData({ ...roomData, participants: updatedParticipants });
    updateRoom(code, { participants: updatedParticipants });
  };

  // Extraemos el participante actual y los demás participantes
  const currentUser = roomData?.participants.find(
    (p) => p.id === currentUserId
  );
  const otherParticipants =
    roomData?.participants.filter((p) => p.id !== currentUserId) || [];

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

      {/* Datos de la sala */}
      <Card style={styles.roomCard}>
        <Card.Content>
          <Title style={styles.roomTitle} numberOfLines={1}>
            {name}
          </Title>
          <Paragraph style={styles.roomDetails}>
            Code: {code}
            {"\n"}
            {description}
            {"\n"}Capacity: {capacity}
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Carrusel horizontal de los demás participantes */}

      <FlatList
        data={otherParticipants}
        keyExtractor={(item) => item.id}
        horizontal
        style={styles.carousel}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
        renderItem={({ item }) => (
          <Card style={styles.participantCard}>
            <Card.Content>
              <Title style={styles.participantName} numberOfLines={1}>
                {item.username}
              </Title>
              <Paragraph style={styles.participantScore} numberOfLines={1}>
                Score: {item.score}
              </Paragraph>
            </Card.Content>
          </Card>
        )}
      />

      {/* Tarjeta del usuario actual en la parte inferior */}
      {currentUser && (
        <View style={styles.currentUserContainer}>
          <Card style={styles.currentUserCard}>
            <Card.Content>
              <Title style={styles.currentUserTitle} numberOfLines={1}>
                {currentUser.username} (You)
              </Title>
              <Paragraph style={styles.currentUserScore} numberOfLines={1}>
                Score: {currentUser.score}
              </Paragraph>
            </Card.Content>
          </Card>
          <View style={styles.buttonContainer}>
            <IconButton
              icon="plus"
              onPress={() => updateScoreForCurrentUser(1)}
              style={styles.button}
            />
            <IconButton
              icon="minus"
              onPress={() => updateScoreForCurrentUser(-1)}
              style={styles.button}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: "#F44336",
  },
  roomCard: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#2D2D2D",
  },
  roomTitle: {
    fontSize: 24,
    color: "#F44336",
    textAlign: "center",
    marginBottom: 10,
  },
  roomDetails: {
    fontSize: 16,
    color: "#E0E0E0",
    textAlign: "center",
  },
  carousel: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#F44336",
    flexGrow: 1,
    flex: 1,
    marginBottom: 10,
  },
  carouselContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    flexGrow: 1,
    flex: 1,
  },
  participantCard: {
    width: 250,
    marginHorizontal: 10,
    backgroundColor: "#2D2D2D",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  participantName: {
    fontSize: 20,
    color: "#F44336",
    textAlign: "center",
  },
  participantScore: {
    fontSize: 18,
    color: "#E0E0E0",
    textAlign: "center",
    marginVertical: 5,
  },
  currentUserContainer: {
    alignItems: "center",
  },
  currentUserCard: {
    width: "100%",
    backgroundColor: "#2D2D2D",
    marginBottom: 10,
  },
  currentUserTitle: {
    fontSize: 22,
    color: "#F44336",
    textAlign: "center",
  },
  currentUserScore: {
    fontSize: 20,
    color: "#E0E0E0",
    textAlign: "center",
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#F44336",
    marginHorizontal: 5,
  },
  homeButton: {
    marginTop: 20,
    backgroundColor: "#F44336",
    alignSelf: "center",
  },
});

export default RoomScreen;
