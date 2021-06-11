import React, { Component } from "react";
import ReactJson from 'react-json-view';
import ProfileImage from './images';
import ProfileCard from "../components/members/profileCard";
class HomePage extends Component {
  
  render() {
    // console.log(this.props.Content);
    var image = <ProfileImage Content={this.props.Content}/>;
    return this.props.Content && (<ProfileCard Content={this.props.Content}/>
    );
  }
}

export default HomePage;
