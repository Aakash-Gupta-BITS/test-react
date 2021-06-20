import React from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { LoginPage as LLoginPage } from "../components/LoginPage/LoginPage";

import { teamListURL } from "../config/endPoints";
import { get } from "../services/managers/Endpoint";
import { signIn } from "../services/authenticate.js";
import { storageTeam } from "../config/storageVars";

const LoginPage = ({ showLoading, onSignChange, onDataLoad, showToast }) => {
  const loadDataFromServer = async () => {
    return get(teamListURL);
  };

  return (
    <LLoginPage
      Header="Sign in with BITS account"
      onSignClick={async () => {
        showLoading(true);
        try {
          await signIn((msg) => showToast(msg, "info"));
          showToast("Getting site data from server", "info");
          const result = await loadDataFromServer();

          if (!result)
            throw new Error(
              "Data fetched from server is empty! Contact Developer"
            );
          reactLocalStorage.setObject(storageTeam, result);
          onDataLoad(result);
        } catch (ex) {
          showToast(ex.message, "error");
        }
        onSignChange();
      }}
    />
  );
};

export default LoginPage;
