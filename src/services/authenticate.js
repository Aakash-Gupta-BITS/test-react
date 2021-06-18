import firebase from "firebase";
import { initializeApp } from "./firebase";
import { serverUrl, localCookieName } from "../config/config";
import Cookie from "js-cookie";

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
    return new Promise((resolve, reject) => {
      fetch(serverUrl + "/api/auth/login", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
          idToken: idToken,
          csrfToken: csrfToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            const text = await res.text();
            throw new Error(text);
          } else return res.json();
        })
        .then((data) => {
          return resolve(data);
        })
        .catch((err) => reject(err));
    });
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
    Cookie.set(localCookieName, "true");

    return Promise.resolve(auth.user);
  } catch (ex) {
    await auth.signOut();
    return Promise.reject(ex);
  }
};

export const signOut = async () => {
  Cookie.remove(localCookieName);
  await auth.signOut();
};

export const isSignedIn = () => {
  return auth.checkClient() && Cookie.get(localCookieName) === "true";
};

export const isAppLoaded = () => {
  return auth.isLoaded;
};
