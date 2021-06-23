import React, { Component } from "react";
import { storageTeam } from "../config/storageVars";
import { isSignedIn, signOut } from "../services/authenticate.js";
import firebase from "firebase";
import { useToast } from "@chakra-ui/react";

import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import Loading from "../components/Loading";
import { reactLocalStorage } from "reactjs-localstorage";

const RenderPages = ({
  team,
  isLoaded,
  isAlreadyLoaded,
  isSignedIn,
  updateLoadStatus,
  updateSignStatus,
  onDataLoad,
}) => {
  const toast = useToast();
  const JSONprops = {
    variant: "left-accent",
    position: "bottom-right",
    duration: 4000,
    isClosable: true,
  };

  if (window.location.pathname === "/reset") {
    signOut();
    return (
      <p>
        You can now goto website{" "}
        <a href={window.location.origin}>{window.location.origin}</a>
      </p>
    );
  }
  if (!isLoaded || !isAlreadyLoaded) return <Loading />;
  if (!isSignedIn)
    return (
      <LoginPage
        showLoading={(status) => updateLoadStatus(!status)}
        onSignChange={updateSignStatus}
        onDataLoad={onDataLoad}
        showToast={(description, status) =>
          toast({
            description: description,
            status: status,
            ...JSONprops,
          })
        }
      />
    );
  return (
    <HomePage
      showLoading={(status) => updateLoadStatus(!status)}
      onSignChange={updateSignStatus}
      teamJSON={team}
      showToast={(description, status) =>
        toast({
          description: description,
          status: status,
          ...JSONprops,
        })
      }
    />
  );
};

class App extends Component {
  state = {
    isLoaded: false,
    isSignedIn: false,
  };
  isAlreadyLoaded = false;
  team = null;

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!this.isAlreadyLoaded) {
        this.isAlreadyLoaded = true;
        this.team = reactLocalStorage.getObject(storageTeam, null);
        this.setState({ isLoaded: true, isSignedIn: isSignedIn() });
      }
    });
  }

  updateLoadStatus = (status) => {
    this.setState({ isLoaded: status });
  };

  updateSignStatus = () => {
    this.setState({ isSignedIn: isSignedIn(), isLoaded: true });
  };
  onDataLoad = (obj) => {
    this.team = obj;
  };

  render() {
    return (
      <RenderPages
        team={this.team}
        isLoaded={this.state.isLoaded}
        isAlreadyLoaded={this.isAlreadyLoaded}
        isSignedIn={this.state.isSignedIn}
        updateLoadStatus={this.updateLoadStatus}
        updateSignStatus={this.updateSignStatus}
        onDataLoad={this.onDataLoad}
      />
    );
  }
}

export default App;
