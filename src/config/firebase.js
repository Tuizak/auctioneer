import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyB_6fmxqqw_9PGGWkoM6mciF_w0qTZDrfs",
  authDomain: "ropart-bd824.firebaseapp.com",
  projectId: "ropart-bd824",
  storageBucket: "ropart-bd824.appspot.com",
  messagingSenderId: "884433315121",
  appId: "1:884433315121:web:8785f8a7bc124ff943fc10",
});

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firestoreApp = app.firestore();
export const storageApp = app.storage();
export const authApp = app.auth();
