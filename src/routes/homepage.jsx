import React from "react";
import {SignOut} from "../services/authenticate.js";

const HomePage = ({ showLoading, onSignChange }) => {
  return (
    <label
      type="button"
      className="btn btn-primary"
      onClick={async () => {
		showLoading(true);
		try{
			await SignOut();
		}
		catch(ex){
            console.log(`Error Occured while sign out: ${ex}`);
		}
		showLoading(false);
		onSignChange();
      }}
    >
      Sign Out
    </label>
  );
};

export default HomePage;