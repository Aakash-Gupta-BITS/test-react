import firebase from "firebase";
import firebaseCommon from "./config";
require("firebase/auth");

const storageVar = firebaseCommon.authStorageVar;
firebaseCommon.initializeApp();
const provider = new firebase.auth.GoogleAuthProvider();

function getLoggedInUser() {
  return firebase.auth().currentUser;
}

const logIn = async (result, error) => {
  let user = firebase.auth().currentUser;

  if (user) {
    result(user);
    return;
  }

  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      return firebase.auth().signInWithPopup(provider);
    })
    .then((res) => {
      try {
        if (res.additionalUserInfo.profile.hd !== "pilani.bits-pilani.ac.in") {
          logOut();
          throw new Error("User not from BITS Pilani Campus");
        }
        console.log("Got from server: ", res);
        result(res);
      } catch (ex) {
        error(ex);
      }
    });
};

const logOut = (result, error) =>
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

const isLoggedIn = () => (firebase.auth().currentUser ? true : false);

const onAuthChange = (callback) =>{

  firebase.auth().onAuthStateChanged((user) => {
    callback(user);
  });
}

firebase.analytics();

const exprts = {
  logIn,
  logOut,
  isLoggedIn,
  onAuthChange,
};

export default exprts;
