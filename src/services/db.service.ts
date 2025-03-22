// services/db.service.ts
import { db } from "./firebase.service";
import {
  collection,
  addDoc,
  getDocs,
  DocumentData,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";

// Ejemplo para agregar un documento a una colección
export const addDocument = async (
  collectionName: string,
  data: DocumentData
): Promise<void> => {
  try {
    await addDoc(collection(db, collectionName), data);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Ejemplo para obtener documentos de una colección
export const getDocuments = async (
  collectionName: string
): Promise<DocumentData[]> => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
};

// Ejemplo para actualizar un documento
export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: Partial<DocumentData>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
