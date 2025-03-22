// services/room.service.ts

import { Participant, RoomData } from "../src/types";
import {
  saveDocument,
  updateDocument,
  getDocument,
  getDocumentsFromCollection,
  subscribeToCollection,
} from "./db.service";

/**
 * Generates a unique 6-character code in uppercase.
 * (In production, you might want to add additional checks to avoid collisions)
 */
export const generateRoomCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

/**
 * Checks if a room with the given code already exists.
 * @param roomCode The room code to check.
 * @returns True if the room exists, false otherwise.
 */
export const roomExists = async (roomCode: string): Promise<boolean> => {
  try {
    const room = await getDocument("rooms", roomCode);
    return room !== null;
  } catch (error) {
    console.error("Error checking if room exists:", error);
    return false;
  }
};

/**
 * Creates a room in Firestore.
 * @param roomDetails The room details excluding 'code' and 'createdAt'.
 * @returns The unique room code generated for the room.
 */
export const createRoom = async (
  roomDetails: Omit<RoomData, "code" | "createdAt">
): Promise<string> => {
  let code = generateRoomCode();
  // Validate that the room code does not already exist
  while (await roomExists(code)) {
    code = generateRoomCode();
  }
  const newRoom: RoomData = {
    code,
    name: roomDetails.name,
    description: roomDetails.description,
    capacity: roomDetails.capacity,
    createdAt: new Date(),
    participants: roomDetails.participants,
  };

  try {
    // Save the room in Firestore using the generated code as the document ID
    await saveDocument("rooms", code, newRoom);
    return code;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

/**
 * Updates a room document in Firestore.
 * @param roomCode The room code used as the document ID.
 * @param data Partial data to update.
 */
export const updateRoom = async (
  roomCode: string,
  data: Partial<RoomData>
): Promise<void> => {
  try {
    await updateDocument("rooms", roomCode, data);
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};

/**
 * Retrieves the data of a room given its code.
 * @param roomCode The room code.
 * @returns The room data, or null if not found.
 */
export const getRoom = async (roomCode: string): Promise<RoomData | null> => {
  try {
    const data = await getDocument("rooms", roomCode);
    if (data) {
      return data as RoomData;
    } else {
      console.error("Room not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching room:", error);
    return null;
  }
};

/**
 * Adds a participant to a room.
 * @param roomCode The room code.
 * @param participant The participant object to add.
 */
export const addParticipantToRoom = async (
  roomCode: string,
  participant: Participant
): Promise<void> => {
  try {
    const room = await getRoom(roomCode);
    if (room) {
      const updatedParticipants = [...room.participants, participant];
      await updateRoom(roomCode, { participants: updatedParticipants });
    } else {
      console.error("Room not found");
    }
  } catch (error) {
    console.error("Error adding participant to room:", error);
    throw error;
  }
};

/**
 * Fetches all rooms from Firestore where the user is a participant.
 * Since the participants are stored as an array, we retrieve all rooms and filter them on the client side.
 * @param userId The ID of the user.
 * @returns An array of RoomData where the user is present.
 */
export const getRooms = async (userId: string): Promise<RoomData[]> => {
  try {
    const roomsData = await getDocumentsFromCollection("rooms");
    return roomsData.filter((room) =>
      (room as RoomData).participants.some(
        (participant: Participant) => participant.id === userId
      )
    ) as RoomData[];
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

/**
 * Subscribes to all rooms in Firestore and returns only those in which the user is a participant.
 * @param userId The ID of the user.
 * @param callback A function that receives an array of RoomData.
 * @returns An unsubscribe function.
 */
export const subscribeRoomsForUser = (
  userId: string,
  callback: (rooms: RoomData[]) => void
) => {
  const unsubscribe = subscribeToCollection(
    "rooms",
    (docs) => {
      const rooms: RoomData[] = docs as RoomData[];
      const userRooms = rooms.filter((room) =>
        room.participants.some(
          (participant: Participant) => participant.id === userId
        )
      );
      callback(userRooms);
    },
    (error) => {
      console.error("Error subscribing to rooms:", error);
    }
  );
  return unsubscribe;
};

/**
 * Subscribes to a room document in Firestore in real time.
 * @param roomCode The room code (document ID).
 * @param callback A function called with the updated RoomData.
 * @returns The unsubscribe function.
 */
export const subscribeRoom = (
  roomCode: string,
  callback: (data: RoomData) => void
): (() => void) => {
  const unsubscribe = subscribeToCollection(
    "rooms",
    (docs) => {
      const room = docs.find((doc) => doc.code === roomCode);
      if (room) {
        callback(room as RoomData);
      }
    },
    (error) => {
      console.error("Error subscribing to room:", error);
    }
  );
  return unsubscribe;
};
