import React, { Component } from "react";
import GoogleSignInButton from "../components/login/googleSignInButton";
import exprts from "../services/authenticate";
class Login extends Component {
  state = {};
  componentDidMount() {
	  
  }
  render() {
    // const { isLoggedIn, onSignInClick } = this.props;

    return (
      <div>
        <GoogleSignInButton
          onClick={async () => await exprts.SignIn()}
          width="191"
          display={!exprts.IsSignedIn()}
        />
      </div>
    );
  }
}

export default Login;
