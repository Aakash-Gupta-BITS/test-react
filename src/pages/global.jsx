import React, { Component } from "react";
import LoginPage from "./loginPage";
import auth from "../services/authenticate";
import HomePage from "./homepage";
import { getMember } from "../services/members";

class Global extends Component {
  state = {
    isWaiting: true,
    isLoggedIn: false,
    userData: null,
  };
  isLoaded = false;

  componentDidMount() {
    auth.onAuthChange(async (usr) => {
      let clientData = null;

      if (usr && !usr.email.endsWith("pilani.bits-pilani.ac.in")) {
        console.log("Bug handled!");
        await auth.logOutAsync();
        return;
      }
      if (usr !== null) {
        try {
          clientData = await getMember(usr.email);
        } catch (ex) {}
      }

      if (!this.isLoaded) {
        this.setState({
          isLoggedIn: usr !== null,
          isWaiting: false,
          userData: clientData,
        });
        this.isLoaded = true;
      } else {
        this.setState({ isLoggedIn: usr !== null, userData: clientData });
      }
    });
  }

  onSignInClick = async () => {
    try {
      this.client = await auth.clientLoginAsync();
      const idToken = await auth.userIdTokenAsync();

      console.log("Sign in completed, Sending response to server");
      const result = await auth.serverLoginAsync(idToken, null);

      console.log("Got from server: ", result);
    } catch (ex) {
      console.log("Err ", ex);
      auth.logOutAsync();
    }
  };

  onSignOutClick = async () => {
    try {
      const result = await auth.logOutAsync();

      console.log("Got from server: ", result);
      this.setState({ isLoggedIn: false, isWaiting: false });
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isWaiting && (
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only"></span>
          </div>
        )}
        {!this.state.isWaiting && (
          <div>
            <LoginPage
              isLoggedIn={this.state.isLoggedIn}
              onSignInClick={async () => {
                this.setState({ isWaiting: true });
                await this.onSignInClick();
                this.setState({ isWaiting: false });
              }}
              onSignOutClick={() => {
                this.setState({ isWaiting: true });
                this.onSignOutClick();
                this.setState({ isWaiting: false });
              }}
            />
            <HomePage Content={this.state.userData} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Global;
