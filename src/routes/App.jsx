import React, { Component } from "react";
import { teamJSONCookie } from "../config/config.js";
import { isSignedIn } from "../services/authenticate.js";
import firebase from "firebase";

import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import Loading from "../components/loading";
import { reactLocalStorage } from "reactjs-localstorage";

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
        this.team = reactLocalStorage.getObject(
          teamJSONCookie,
          null
        );
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
