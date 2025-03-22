import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveDocument } from "./db.service";

const SESSION_KEY = "userSession";

export interface Session {
  username: string;
  userId: string;
}

export const saveSession = async (session: Session): Promise<void> => {
  try {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error("Error saving session:", error);
  }
  try {
    await saveDocument("sessions", session.userId, {
      username: session.username,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error saving session to Firebase via db.service:", error);
  }
};

export const getSession = async (): Promise<Session | null> => {
  try {
    const sessionString = await AsyncStorage.getItem(SESSION_KEY);
    if (sessionString) {
      return JSON.parse(sessionString) as Session;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving session:", error);
    return null;
  }
};

export const clearSession = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error("Error clearing session:", error);
  }
};
