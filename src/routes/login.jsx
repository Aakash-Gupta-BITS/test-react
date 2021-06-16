import React, { Component } from 'react';
import GoogleSignInButton from "../components/login/googleSignInButton";
class Login extends Component {
	state = {  }
	render() { 
		const { isLoggedIn, onSignInClick } = this.props;

		return (
		<div>
			<GoogleSignInButton
			onClick={async () => await onSignInClick()}
			width="191"
			display={!isLoggedIn}
			/>
		</div>
		);
	}
}
 
export default Login;