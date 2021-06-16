import React, { Component } from 'react';
import { BrowserRouter, Switch , Route } from 'react-router-dom';
import HomePage from '../pages/homepage';
import exprts from '../services/authenticate';

class Router extends Component {
	state = {  }
	render() { 
		return ( 
			<Switch>
				<Route path = "/signIn" component={Login}>

				</Route>
				<Route path = "/profiles" render ={()=>{
					<HomePage Component = {this.state.userdata}/>
				}}/>
				<Route path = "/" render={()=>{
					
				}}/>
			</Switch>
		 );
	}
}
 
export default Router;