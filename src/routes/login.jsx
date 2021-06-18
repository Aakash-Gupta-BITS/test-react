import React from "react";
import GoogleSignInButton from "../components/login/googleSignInButton";
import { SignIn, IsSignedIn } from "../services/authenticate.js";

const Login = ({ showLoading, onSignChange }) => {
  return (
    <>
      <GoogleSignInButton
        onClick={async () => {
          showLoading(true);
          try {
            await SignIn((percent) => console.log(percent));
          } catch (ex) {
            console.log(`Error Occured while sign in: ${ex}`);
          }
          showLoading(false);
          onSignChange();
        }}
        width="191"
        display={!IsSignedIn()}
      />
    </>
  );
};

export default Login;
