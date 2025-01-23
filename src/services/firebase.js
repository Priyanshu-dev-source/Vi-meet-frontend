import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"
// import { get } from "http";

const firebaseConfig = {
  apiKey: "AIzaSyB3pilKR8s9rhnnM297oPuxHM7SJNVqj_Y",
  authDomain: "vi-meet-1bf48.firebaseapp.com",
  databaseURL: "https://vi-meet-1bf48-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vi-meet-1bf48",
  storageBucket: "vi-meet-1bf48.firebasestorage.app",
  messagingSenderId: "895097532936",
  appId: "1:895097532936:web:e5583e65ae2450b59a97bd",
  measurementId: "G-K8RGYY0Z75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getDatabase()
export const database = getDatabase(app)
export default app;
