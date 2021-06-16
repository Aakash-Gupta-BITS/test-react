import React, { Component } from 'react';
import exprts from '../services/authenticate';
const HomePage = () => {
	return ( <label
		type="button"
		className="btn btn-primary"
		onClick={() => exprts.SignOut()}
	  >
		Sign Out
	  </label> );
}
 
export default HomePage;
