import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { config } from "../src/config";

const firebaseConfig = {
  apiKey: config.firebaseConfig.apiKey,
  authDomain: config.firebaseConfig.authDomain,
  projectId: config.firebaseConfig.projectId,
  storageBucket: config.firebaseConfig.storageBucket,
  messagingSenderId: config.firebaseConfig.messagingSenderId,
  appId: config.firebaseConfig.appId,
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

const db: Firestore = getFirestore(firebaseApp);

const auth: Auth = getAuth(firebaseApp);

export { firebaseApp, db, auth };
