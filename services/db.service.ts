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
  onSnapshot,
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

/**
 * Subscribes to a Firestore collection and executes the callback with the documents.
 * @param collectionName The name of the collection.
 * @param callback A function that receives an array of DocumentData.
 * @param errorCallback Optional error callback.
 * @returns An unsubscribe function.
 */
export const subscribeToCollection = (
  collectionName: string,
  callback: (docs: DocumentData[]) => void,
  errorCallback?: (error: any) => void
) => {
  const colRef = collection(db, collectionName);
  const q = query(colRef);
  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(docs);
    },
    errorCallback
  );
  return unsubscribe;
};
