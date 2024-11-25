// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6Kf35mT6Y3_SHT-g0LQih_Aksj7Bfr-A",
  authDomain: "languageninja-632a2.firebaseapp.com",
  projectId: "languageninja-632a2",
  storageBucket: "languageninja-632a2.firebasestorage.app",
  messagingSenderId: "88463667195",
  appId: "1:88463667195:web:6019aba62132d15a37e55e",
  measurementId: "G-0TKP3CJ4K6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

export default app;
