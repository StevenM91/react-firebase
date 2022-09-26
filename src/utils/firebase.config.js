import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "@firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "social-firebase-c725a.firebaseapp.com",
  projectId: "social-firebase-c725a",
  storageBucket: "social-firebase-c725a.appspot.com",
  messagingSenderId: "197445637461",
  appId: "1:197445637461:web:7785a926db17ca4ba1cbdc",
});

export const auth = app.auth();
export const db = getFirestore();
export default app;
