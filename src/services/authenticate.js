import firebase from "firebase";
import firebaseCommon from "./config";
import Cookies from "js-cookie";

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

  checkCookies = () => {
    console.log(Cookies.get("session"));
    if (Cookies.get("session")) return true;
    console.log("False will pervail");
    return false;
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
    console.log(idToken);
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
          Cookies.set("session", true);
          return resolve(data);
        })
        .catch((err) => reject(err));
    });
  };

  signOut = async () => {
    return new Promise((resolve, reject) => {
      this.clearCookie();
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

  clearCookie = () => {
    Cookies.remove("session");
  };
}

const auth = new Auth();
firebase.analytics();

const SignIn = async () => {
  if (auth.checkClient() && auth.checkCookies())
    return Promise.resolve(auth.user);

  try {
    await auth.signOut();
    await auth.clientLogIn();

    if (!auth.checkClient())
      throw new Error("Kindly use BITS email ID to log in");
    console.log("Firebase Signed IN Success");
    const res = await auth.serverLogIn();
    if (!auth.checkCookies())
      throw new Error("Kindly allow cookies in the browser");
    console.log(res);
    return Promise.resolve(auth.user);
  } catch (ex) {
    await auth.signOut();
    console.log("Signed OUt due to Error");
    console.log(ex);
    return Promise.reject(ex);
  }
};

const SignOut = async () => {
  await auth.signOut();
  console.log("Signed OUt Successfully");
};

const IsSignedIn = () => {
  return auth.checkCookies();
};

const IsAppLoaded = () => {
  return auth.isLoaded;
};

const exprts = {
  SignIn,
  SignOut,
  IsSignedIn,
  IsAppLoaded
};

export default exprts;
