import firebase from "firebase";
import firebaseCommon from "./config";

require("firebase/auth");

const serverUrl = "https://mysterious-reef-38114.herokuapp.com"; //"http://localhost:8000";
firebaseCommon.initializeApp();
const provider = new firebase.auth.GoogleAuthProvider();

const userIdTokenAsync = () => {
  let user = firebase.auth().currentUser;
  if (!user) return Promise.reject("User is not logged in");
  return new Promise((resolve, reject) => {
    user
      .getIdToken(true)
      .then(function (idToken) {
        resolve(idToken);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const clientLoginAsync = () => {
  let user = firebase.auth().currentUser;
  if (user) return Promise.resolve(user);

  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((res) => resolve(firebase.auth().currentUser))
          .catch((err) => reject(err));
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const serverLoginAsync = (idToken, csrfToken) => {
  return new Promise((resolve, reject) => {
    fetch(serverUrl + "/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        idToken: idToken,
        csrfToken: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok)
          return res.text().then((text) => {
            throw new Error(text);
          });
        else return res.json();
      })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const logOutAsync = () => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          console.log("Signed Out");
        },
        function (error) {
          console.log("Sign Out Error ", error);
        }
      );
    fetch(serverUrl + "/api/auth/logout", {
      method: "POST",
      body: "",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const isLoggedIn = () => (firebase.auth().currentUser ? true : false);

const onAuthChange = (callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    callback(user);
  });
};

firebase.analytics();

const exprts = {
  userIdTokenAsync,
  clientLoginAsync,
  serverLoginAsync,
  logOutAsync,
  isLoggedIn,
  onAuthChange,
};

export default exprts;
