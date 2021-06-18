import firebase from "firebase";
import { firebaseConfig } from "../config/config";

export const initializeApp = () => {
  if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
};

export const getFirestore = () => {
  return firebase.firestore();
};

export const getStorage = () => {
  return firebase.storage();
};
