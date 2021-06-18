import React from "react";
import GoogleSignInButton from "../components/login/GoogleSignInButton";
import { signIn, isSignedIn } from "../services/authenticate.js";

const LoginPage = ({ showLoading, onSignChange, infoToast, errorToast }) => {
  return (
    <>
      <GoogleSignInButton
        onClick={async () => {
          showLoading(true);
          try {
            await signIn(infoToast);
          } catch (ex) {
            errorToast(ex.message);
          }
          showLoading(false);
          onSignChange();
        }}
        width="191"
        display={!isSignedIn()}
      />
    </>
  );
};

export default LoginPage;
