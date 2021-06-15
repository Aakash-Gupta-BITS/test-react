import React, { Component } from "react";
import ReactJson from 'react-json-view';
import ProfileImage from './images';
import ProfileCard from "../components/members/profileCard";
import ProfilePage from "../components/members/profile-page"
class HomePage extends Component {
  
  render() {
    // console.log(this.props.Content);
    // var image = <ProfileImage Content={this.props.Content}/>;
    return this.props.Content && (<ProfilePage Content={this.props.Content}/>
    );
  }
}

export default HomePage;
