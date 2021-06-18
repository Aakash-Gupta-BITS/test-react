import React from "react";
import GoogleSignInButton from "../components/login/GoogleSignInButton";
import { SignIn, IsSignedIn } from "../services/authenticate.js";

const LoginPage = ({ showLoading, onSignChange }) => {
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

export default LoginPage;
