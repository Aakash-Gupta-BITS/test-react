import firebase from "firebase";
import firebaseCommon from "./config"
require("firebase/auth");

const storageVar = firebaseCommon.authStorageVar;
firebaseCommon.initializeApp();

const provider = new firebase.auth.GoogleAuthProvider();

function getLoggedInUser() {
  const str = localStorage.getItem(storageVar);
  if (!str) return null;
  const res = JSON.parse(str);
  return res;
}

function saveUser(auth) {
  console.log("Saving: ", auth);
  localStorage.setItem(storageVar, JSON.stringify(auth));
}

function removeUser() {
  localStorage.removeItem(storageVar);
}

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
      console.log("Got from server: ", res);
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
  user: getLoggedInUser
};

export default exprts;
