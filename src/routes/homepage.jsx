import React from "react";
import { signOut } from "../services/authenticate.js";

const HomePage = ({ showLoading, onSignChange, errorToast }) => {
  return (
    <>
      <label
        type="button"
        className="btn btn-primary"
        onClick={async () => {
          showLoading(true);
          try {
            await signOut();
          } catch (ex) {
            errorToast(ex.message);
          }
          showLoading(false);
          onSignChange();
        }}
      >
        Sign Out
      </label>
    </>
  );
};

export default HomePage;
