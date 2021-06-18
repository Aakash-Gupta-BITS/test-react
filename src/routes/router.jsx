import React, { Component } from "react";
import { IsSignedIn } from "../services/authenticate.js";
import firebase from "firebase";

import Login from "./login";
import HomePage from "./homepage";
import Loading from "../components/loading";

class Router extends Component {
  state = {
    isLoaded: false,
    isSignedIn: false,
  };
  firstTimeLoad = false;

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!this.firstTimeLoad) {
        this.firstTimeLoad = true;
        this.setState({ isLoaded: true, isSignedIn: IsSignedIn() });
      }
    });
  }

  updateLoadStatus = (status) => {
    this.setState({ isLoaded: status });
  };

  updateSignStatus = () => {
    this.setState({ isSignedIn: IsSignedIn() });
  };

  render() {
    if (!this.state.isLoaded || !this.firstTimeLoad) return <Loading />;
    if (!this.state.isSignedIn)
      return (
        <Login
          showLoading={(status) => this.updateLoadStatus(!status)}
          onSignChange={() => this.updateSignStatus()}
        />
      );
    return (
      <HomePage
        showLoading={(status) => this.updateLoadStatus(!status)}
        onSignChange={() => this.updateSignStatus()}
      />
    );
  }
}

export default Router;
