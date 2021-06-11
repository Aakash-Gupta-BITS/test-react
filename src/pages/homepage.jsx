import React, { Component } from "react";
import ReactJson from 'react-json-view';
import ProfileImage from './images';
class HomePage extends Component {
  
  render() {
    var image = <ProfileImage Content={this.props.Content}/>;
    return this.props.Content && (<ReactJson src={this.props.Content}/>
    );
  }
}

export default HomePage;
