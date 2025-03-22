// services/db.service.ts

import { db } from "./firebase.service";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  collection,
  getDocs,
  DocumentData,
  query,
} from "firebase/firestore";

/**
 * Saves a document in the specified collection using the given document ID.
 */
export const saveDocument = async (
  collectionName: string,
  docId: string,
  data: DocumentData
): Promise<void> => {
  try {
    await setDoc(doc(db, collectionName, docId), data);
  } catch (error) {
    console.error("Error saving document:", error);
    throw error;
  }
};

/**
 * Updates a document in the specified collection using the given document ID.
 */
export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: Partial<DocumentData>
): Promise<void> => {
  try {
    await updateDoc(doc(db, collectionName, docId), data);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

/**
 * Retrieves a document from the specified collection using the given document ID.
 */
export const getDocument = async (
  collectionName: string,
  docId: string
): Promise<DocumentData | null> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
};

/**
 * Retrieves all documents from a specified collection.
 */
export const getDocumentsFromCollection = async (
  collectionName: string
): Promise<DocumentData[]> => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting documents from collection:", error);
    return [];
  }
};
