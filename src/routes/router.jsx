import React, { Component } from 'react';
import { BrowserRouter, Switch , Route } from 'react-router-dom';
import HomePage from './homepage';
import exprts from '../services/authenticate';
import Login  from './login'

class Router extends Component {
	state = {  }
	render() { 
		if(!exprts.IsAppLoaded()){
			
		}
		return ( 
			<Switch>
				<Route path = "/signIn" component={Login}>

				</Route>
				<Route path = "/profiles" component={HomePage}/>
				<Route path = "/" render={()=>{
					<div><h1>Hello</h1></div>
				}}/>
			</Switch>
		 );
	}
}
 
export default Router;