import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./homepage";
import exprts from "../services/authenticate.js";
import Login from "./login";
import Loading from "../components/loading";
import firebase from "firebase";

class Router extends Component {
  state = { isLoaded: false };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isLoaded: true });
    });
  }

  render() {
   // if (!this.state.isLoaded) return <Route component={Loading} />;

    return (
      <Switch>
       
        <Route path="/signIn" component={Login}></Route>
        <Route
          path="/loading"
          render={() => {
            if (!exprts.IsSignedIn()) return <Route component={Login} />;
            return (
              <div>
                <h1>Hello</h1>
              </div>
            );
          }}
        ></Route>
        <Route path="/homepage" component={HomePage} />
      </Switch>
    );
  }
}

export default Router;
