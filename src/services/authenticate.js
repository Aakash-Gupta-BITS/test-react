import firebase from "firebase";
import { initializeApp } from "./firebase";
import { storageAuth, storageTeam } from "../config/storageVars";
import { post } from "./managers/Endpoint";
import { reactLocalStorage } from "reactjs-localstorage";
import { signInURL } from "../config/endPoints";
const provider = new firebase.auth.GoogleAuthProvider();

class Auth {
  constructor() {
    initializeApp();
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      this.isLoaded = true;
    });

    if (!Auth.instance) {
      Auth.instance = this;
    }

    this.isLoaded = false;
    this.user = null;

    return Auth.instance;
  }

  checkClient = () => {
    return (
      this.isLoaded &&
      this.user &&
      this.user.email.endsWith("pilani.bits-pilani.ac.in")
    );
  };

  clientLogIn = async () => {
    if (this.user) return Promise.resolve(this.user);

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

  serverLogIn = async (csrfToken) => {
    const idToken = await this.user.getIdToken(true);
    return post(
      signInURL,
      JSON.stringify({
        idToken: idToken,
        csrfToken: csrfToken,
      })
    );
  };

  signOut = async () => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(
          function () {
            resolve(`Signed Out`);
          },
          function (error) {
            reject(`Sign Out Error : ${error}`);
          }
        );
    });
  };
}

const auth = new Auth();
firebase.analytics();

export const signIn = async (success) => {
  if (isSignedIn()) return Promise.resolve(auth.user);

  try {
    await auth.signOut();
    await auth.clientLogIn();

    if (!auth.checkClient())
      throw new Error("Kindly use BITS email ID to log in");

    success("Sign in almost done! Verifying from server...");

    await auth.serverLogIn();

    success("Signed in");
    reactLocalStorage.set(storageAuth, "signedIn");

    return Promise.resolve(auth.user);
  } catch (ex) {
    await auth.signOut();
    return Promise.reject(ex);
  }
};

export const signOut = async () => {
  reactLocalStorage.remove(storageAuth);
  reactLocalStorage.remove(storageTeam);
  await auth.signOut();
};

export const isSignedIn = () => {
  return (
    auth.checkClient() && reactLocalStorage.get(storageAuth) === "signedIn"
  );
};

export const isAppLoaded = () => {
  return auth.isLoaded;
};
