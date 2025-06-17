import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-ISzlI0ughqQQxtgriwrXfGFsMY1XuT8",
  authDomain: "notion-ai-4816d.firebaseapp.com",
  projectId: "notion-ai-4816d",
  storageBucket: "notion-ai-4816d.firebasestorage.app",
  messagingSenderId: "258087210423",
  appId: "1:258087210423:web:775e34aacd39dcea67ec32",
  measurementId: "G-YQTYLJ11SZ"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)

export {db}