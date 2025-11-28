import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKqkfONJqhWLRAzwILUN0qQIEraDPiaa0",
  authDomain: "farmtech-solutions-cb81c.firebaseapp.com",
  projectId: "farmtech-solutions-cb81c",
  storageBucket: "farmtech-solutions-cb81c.firebasestorage.appspot.com",
  messagingSenderId: "369068173652",
  appId: "1:369068173652:web:862912b2b1540f0b5340c1",
  measurementId: "G-DV8414QBR0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Always use initializeAuth with persistence for React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
