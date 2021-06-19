import React, { Component } from "react";
import { isSignedIn } from "../services/authenticate.js";
import firebase from "firebase";

import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import Loading from "../components/loading";

class App extends Component {
  state = {
    isLoaded: false,
    isSignedIn: false,
  };
  firstTimeLoad = false;
  team = null;

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
  onDataLoad = (obj) => {
    this.team = obj;
  };
  render() {
    if (!this.state.isLoaded || !this.firstTimeLoad) return <Loading />;
    if (!this.state.isSignedIn)
      return (
        <LoginPage
          showLoading={(status) => this.updateLoadStatus(!status)}
          onSignChange={() => this.updateSignStatus()}
          onDataLoad={this.onDataLoad}
        />
      );
    return (
      <HomePage
        showLoading={(status) => this.updateLoadStatus(!status)}
        onSignChange={() => this.updateSignStatus()}
        Data={this.team}
      />
    );
  }
}

export default App;
