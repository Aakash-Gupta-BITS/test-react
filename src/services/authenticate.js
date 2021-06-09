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

const storageVar = "authUser";

function getLoggedInUser() {
  const str = localStorage.getItem(storageVar);
  if (!str) return null;
  return JSON.stringify(str);
}

function saveUser(auth) {
  localStorage.setItem(storageVar, auth);
}

function removeUser() {
  localStorage.removeItem(storageVar);
}

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

const logIn = async (result, error) => {
  let user = firebase.auth().currentUser || getLoggedInUser();

  if (user) result(user);
  else
    try {
      const res = await firebase.auth().signInWithPopup(provider);

      if (res.additionalUserInfo.profile.hd !== "pilani.bits-pilani.ac.in") {
        logOut();
        throw new Error("User not from BITS Pilani Campus");
      }
      saveUser(res);
      result(res);
    } catch (ex) {
      removeUser();

      error(ex);
    }
};

const logOut = (result, error) => {
  removeUser();
  firebase
    .auth()
    .signOut()
    .then(
      function () {
        console.log("Signed Out");
      },
      function (error) {
        console.error("Sign Out Error", error);
        alert(error);
      }
    );
};

const isLoggedIn = () => {
  if (localStorage.getItem(storageVar)) return true;
  return false;
};

firebase.analytics();

const exprts = {
  logIn,
  logOut,
  isLoggedIn,
};

export default exprts;
