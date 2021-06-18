import React, { Component } from "react";
import { isSignedIn } from "../services/authenticate.js";
import firebase from "firebase";

import LoginPage from "./LoginPage";
import HomePage from "./Homepage";
import Loading from "../components/loading";

class App extends Component {
  state = {
    isLoaded: false,
    isSignedIn: false,
  };
  firstTimeLoad = false;

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!this.firstTimeLoad) {
        this.firstTimeLoad = true;
        this.setState({ isLoaded: true, isSignedIn: isSignedIn() });
      }
    });
  }

  updateLoadStatus = (status) => {
    this.setState({ isLoaded: status });
  };

  updateSignStatus = () => {
    this.setState({ isSignedIn: isSignedIn() });
  };

  render() {
    if (!this.state.isLoaded || !this.firstTimeLoad) return <Loading />;
    if (!this.state.isSignedIn)
      return (
        <LoginPage
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

export default App;
