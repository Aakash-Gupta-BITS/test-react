import React, { Component } from "react";

import GoogleSignInButton from "../components/login/googleSignInButton";

class LoginPage extends Component {

  render() {
    const { isLoggedIn, onSignInClick, onSignOutClick } = this.props;
    
    return (
      <React.Fragment>
        <GoogleSignInButton
          onClick={async  () => await onSignInClick()}
          width="191"
          display={!isLoggedIn}
        />
        <div>
          {isLoggedIn && (
            <label
              type="button"
              className="btn btn-primary"
              onClick={() => onSignOutClick()}
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
