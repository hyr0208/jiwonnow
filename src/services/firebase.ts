import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCZpTQJcyAoUyZjEfGPYRzHXjhU2jRbRI0",
  authDomain: "jiwonnow.firebaseapp.com",
  projectId: "jiwonnow",
  storageBucket: "jiwonnow.firebasestorage.app",
  messagingSenderId: "940215224471",
  appId: "1:940215224471:web:9820ed552bda22d50201d2",
  measurementId: "G-CTXQCTCZGN",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
