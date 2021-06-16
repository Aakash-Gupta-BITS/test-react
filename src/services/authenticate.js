import firebase from "firebase";
import firebaseCommon from "./config";

const Signin = () => {
  return Promise.resolve(true);
}

const SignOut = () =>{
  return Promise.resolve(true);
}

const IsSignedIn = ()=>{
  return Promise.resolve(false);
}

const exprts = {
  Signin,
  SignOut,
  IsSignedIn
}

export default exprts;
