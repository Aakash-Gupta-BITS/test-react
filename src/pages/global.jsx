import React, { Component } from "react";
import LoginPage from "./loginPage";
import auth from "../services/authenticate";
import HomePage from "./homepage";

class Global extends Component {
  state = {
    isLoggedIn: auth.isLoggedIn(),
    user: auth.user()
  };

  onSignInClick = async () => {
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
  };

  onSignOutClick = () => {
    auth.logOut();
    this.updateState();
  };

  updateState() {
    const usr = auth.user();
    console.log("Got from storage: ", usr);
    this.setState({ isLoggedIn: auth.isLoggedIn(), user: auth.user() });
  }

  render() {
    return (
      <React.Fragment>
        <LoginPage
          isLoggedIn={this.state.isLoggedIn}
          onSignInClick={this.onSignInClick}
          onSignOutClick={this.onSignOutClick}
        />
        <HomePage 
        Content={this.state.user}/>
      </React.Fragment>
    );
  }
}

export default Global;
