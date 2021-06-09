import React, { Component } from "react";
import LoginPage from "./loginPage";
import auth from "../services/authenticate";
import HomePage from "./homepage";

class Global extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoaded: false
  };

  componentDidMount() {
    auth.onAuthChange((usr) => {
      this.setState({ user: usr, isLoggedIn: usr !== null, isLoaded: true });
    });
  }

  onSignInClick = async () => {
    await auth.logIn(
      (result) => {
        console.log("Signed in successfully");
      },
      (err) => {
        console.log(err);
        alert(err);
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        {
          !this.state.isLoaded && <div class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
        </div>
        }
        {
          this.state.isLoaded && <div><LoginPage
          isLoggedIn={this.state.isLoggedIn}
          onSignInClick={this.onSignInClick}
          onSignOutClick={() => auth.logOut()}
        />
        <HomePage Content={this.state.user} />
            </div>}
      </React.Fragment>
    );
  }
}

export default Global;
