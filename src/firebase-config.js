import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMIjaGH_arojEGNMrqhdmtbiC0IwPPS9E",
  authDomain: "todo-app-dabf0.firebaseapp.com",
  projectId: "todo-app-dabf0",
  storageBucket: "todo-app-dabf0.appspot.com",
  messagingSenderId: "654297059149",
  appId: "1:654297059149:web:67c74aa106567ac96c7104",
  measurementId: "G-47EN3GDJPY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
