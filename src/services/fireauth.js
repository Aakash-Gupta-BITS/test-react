import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAnShiAT2RseXUlnVUAf_JBSk0C37Zq_0E",
  authDomain: "coding-club-competitive.firebaseapp.com",
  projectId: "coding-club-competitive",
  storageBucket: "coding-club-competitive.appspot.com",
  messagingSenderId: "424350384226",
  appId: "1:424350384226:web:7fb0fde3a2620e95f6513b",
  measurementId: "G-9K9XP8WS3L",
};

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

const auth = async (result, error) => {
  try {
    const res = await firebase.auth().signInWithPopup(provider);
    if (res.additionalUserInfo.profile.hd === "pilani.bits-pilani.ac.in")
        result(res);
    else
        throw new Error('User not from BITS Pilani Campus');
  } catch (ex) {
    error(ex);
  }
};

firebase.analytics();
export default {
  auth,
};
