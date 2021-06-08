import React, { Component } from "react";
import normalLogo from "./resources/btn_google_signin_light_normal_web.png";
import pressedLogo from "./resources/btn_google_signin_light_pressed_web.png";
import firebase from "./services/fireauth";

class LoginPage extends Component {
  state = {
    imgLogo: normalLogo,
    authenticated: false
  };

  render() {
    return (
      <React.Fragment>
        <label
          type="button"
          style={{visibility: !this.state.authenticated ? 'visible' : 'hidden' }}
          onMouseDown={() => this.setState({ imgLogo: pressedLogo })}
          onMouseUp={() => this.setState({ imgLogo: normalLogo })}
          onClick={async () => {
            await firebase.auth(result =>{
                alert("Success!!");
                this.setState({authenticated: true});
            },
            err =>{
                alert(err);
            });
          }}
        >
          <img src={this.state.imgLogo} alt="Sign in with Google" width="191" />
        </label>
      </React.Fragment>
    );
  }
}

export default LoginPage;
