import React, { Component } from 'react';
import LoginPage from "./loginPage";
import auth from "../services/authenticate";

class Global extends Component {
  state = {
    isLoggedIn: auth.isLoggedIn(),
  };
  
  onSignInClick = async () => {
    await auth.logIn(
      result => {
        console.log("Signed in successfully");
        this.updateState();
      },
      err => {
        console.log(err);
        this.updateState();
        alert(err);
      }
    );
  }
  
  onSignOutClick = () => {
    auth.logOut();
    this.updateState();
  }

  updateState() {
    this.setState({ isLoggedIn: auth.isLoggedIn() });
  }
  
  render() {
    return (
      <LoginPage
        isLoggedIn={this.state.isLoggedIn}
        onSignInClick={this.onSignInClick}
        onSignOutClick={this.onSignOutClick}
      />
    );
  }
}

export default Global;
