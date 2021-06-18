import React from "react";
import GoogleSignInButton from "../components/login/googleSignInButton";
import exprts from "../services/authenticate.js";

const Login = ({ showLoading, onSignChange }) => {
  return (
    <div>
      <GoogleSignInButton
        onClick={async () => {
          showLoading(true);
          try {
            await exprts.SignIn((percent) => console.log(percent));
          } catch (ex) {
            console.log(`Error Occured while sign in: ${ex}`);
          }
          showLoading(false);
          onSignChange();
        }}
        width="191"
        display={!exprts.IsSignedIn()}
      />
    </div>
  );
};

export default Login;
