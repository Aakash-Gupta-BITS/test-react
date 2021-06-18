import firebase from "firebase";
import firebaseCommon from "./config";

require("firebase/auth");

const serverUrl = firebaseCommon.serverUrl;
const provider = new firebase.auth.GoogleAuthProvider();

class Auth {
  constructor() {
    firebaseCommon.initializeApp();
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

const SignIn = async (callback) => {
  if (auth.checkClient()) return Promise.resolve(auth.user);

  try {
    callback(0);
    await auth.signOut();
    callback(20);
    await auth.clientLogIn();
    callback(50);
    if (!auth.checkClient())
      throw new Error("Kindly use BITS email ID to log in");

    await auth.serverLogIn();
    callback(100);
    return Promise.resolve(auth.user);
  } catch (ex) {
    await auth.signOut();
    callback(100);
    return Promise.reject(ex);
  }
};

const SignOut = async () => {
  await auth.signOut();
};

const IsSignedIn = () => {
  return auth.checkClient();
};

const IsAppLoaded = () => {
  return auth.isLoaded;
};

const exprts = {
  SignIn,
  SignOut,
  IsSignedIn,
  IsAppLoaded,
};

export default exprts;
