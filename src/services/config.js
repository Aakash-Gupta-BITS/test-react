import firebase from "firebase";
require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyAnShiAT2RseXUlnVUAf_JBSk0C37Zq_0E",
  authDomain: "coding-club-competitive.firebaseapp.com",
  projectId: "coding-club-competitive",
  storageBucket: "coding-club-competitive.appspot.com",
  messagingSenderId: "424350384226",
  appId: "1:424350384226:web:7fb0fde3a2620e95f6513b",
  measurementId: "G-9K9XP8WS3L",
};

const authStorageVar = "authUser";

const initializeApp = () => {
  if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
};

const getFirestore = () =>{
    return firebase.firestore();
}

const vars = {
    authStorageVar,
    initializeApp,
    getFirestore
};

export default vars;