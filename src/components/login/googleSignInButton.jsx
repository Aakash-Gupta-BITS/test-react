import React, { Component } from "react";
import normalLogo from "../../resources/btn_google_signin_light_normal_web.png";
import pressedLogo from "../../resources/btn_google_signin_light_pressed_web.png";
import disabledLogo from "../../resources/btn_google_signin_light_disabled_web.png";

class GoogleSignInButton extends Component {
  state = {
    imgLogo: normalLogo,
  };

  render() {
    const { onClick, width, display } = this.props;

    if (display)
      return (
        <>
          <label
            type={display && "button"}
            onMouseDown={() => this.setState({ imgLogo: pressedLogo })}
            onMouseUp={() => this.setState({ imgLogo: normalLogo })}
            onMouseLeave={() => this.setState({ imgLogo: normalLogo })}
            onClick={onClick}
          >
            <img
              src={this.state.imgLogo}
              alt="Sign in with Google"
              width={width}
            />
          </label>
        </>
      );
    return (
      <>
        <label>
          <img src={disabledLogo} alt="Sign in with Google" width={width} />
        </label>
      </>
    );
  }
}

export default GoogleSignInButton;
