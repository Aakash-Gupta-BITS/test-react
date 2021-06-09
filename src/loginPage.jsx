import React, { Component } from "react";
import GoogleSignInButton from "./components/login/googleSignInButton";
import auth from "./services/authenticate";

class LoginPage extends Component {
  state = {
    isLoggedIn: auth.isLoggedIn(),
  };

  updateState() {
    this.setState({ isLoggedIn: auth.isLoggedIn() });
  }

  render() {
    const { isLoggedIn } = this.state;
    
    return (
      <React.Fragment>
        <GoogleSignInButton
          onClick={async () => {
            await auth.logIn(
              (result) => {
                console.log("Signed in successfully");
                this.updateState();
              },
              (err) => {
                console.log(err);
                this.updateState();
                alert(err);
              }
            );
          }}
          width="191"
          display={!isLoggedIn}
        />
        <div>
          {isLoggedIn && (
            <label
              type="button"
              className="btn btn-primary"
              onClick={() => {
                auth.logOut();
                this.updateState();
              }}
            >
              Sign Out
            </label>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default LoginPage;
