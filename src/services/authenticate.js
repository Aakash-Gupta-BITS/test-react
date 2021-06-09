import firebase from "firebase";
import vars from "./config"
require("firebase/auth");

const storageVar = vars.authStorageVar;
const firebaseConfig = vars.firebaseConfig;

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
