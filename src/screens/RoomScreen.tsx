import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Title, Paragraph, Button, Card, IconButton } from "react-native-paper";
import { Participant, RootStackParamList } from "../types";

type RoomScreenProps = NativeStackScreenProps<RootStackParamList, "Room">;

const RoomScreen = ({ route }: RoomScreenProps) => {
  const { roomCode, roomName, roomDescription, roomCapacity } = route.params;

  // Simulamos una lista de participantes
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "You", score: 0, isCurrent: true },
    { id: "2", name: "Opponent 1", score: 5, isCurrent: false },
    { id: "3", name: "Opponent 2", score: 3, isCurrent: false },
  ]);

  // Solo el usuario actual puede aumentar su propio puntaje
  const addPointToCurrentUser = () => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) =>
        participant.isCurrent
          ? { ...participant, score: participant.score + 1 }
          : participant
      )
    );
  };
  const subtractPointToCurrentUser = () => {
    if (participants[0].score === 0) return;
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) =>
        participant.isCurrent
          ? { ...participant, score: participant.score - 1 }
          : participant
      )
    );
  };

  return (
    <View style={styles.container}>
      <Card style={styles.roomCard}>
        <Card.Content>
          <Title style={styles.roomTitle}>{roomName || "Room"}</Title>
          <Paragraph style={styles.roomDetails}>
            Code: {roomCode}
            {"\n"}
            {roomDescription && `Description: ${roomDescription}\n`}
            {roomCapacity && `Capacity: ${roomCapacity}`}
          </Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.participantsContainer}>
        {participants.map((participant) => (
          <Card key={participant.id} style={styles.participantCard}>
            <Card.Content>
              <Title style={styles.participantName}>{participant.name}</Title>
              <Paragraph style={styles.participantScore}>
                Score: {participant.score}
              </Paragraph>
              {participant.isCurrent && (
                <View style={styles.iconButtonContainer}>
                  <IconButton
                    icon={"plus"}
                    mode="contained"
                    onPress={addPointToCurrentUser}
                    style={styles.button}
                  />
                  <IconButton
                    icon={"minus"}
                    mode="contained"
                    onPress={subtractPointToCurrentUser}
                    style={styles.button}
                  />
                </View>
              )}
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    padding: 20,
    alignItems: "center",
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
  participantsContainer: {
    width: "100%",
  },
  participantCard: {
    marginBottom: 15,
    backgroundColor: "#2D2D2D",
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
  button: {
    backgroundColor: "#F44336",
    alignSelf: "center",
    marginTop: 10,
  },
  iconButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default RoomScreen;
