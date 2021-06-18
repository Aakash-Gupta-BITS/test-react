import React, { Component } from "react";
import ReactJson from 'react-json-view';
import ProfileImage from './ProfileImage';
import ProfileCard from "../components/members/profileCard";
import ProfilePage from "../components/members/profile-page"
class HomePage extends Component {
  
  render() {
    return this.props.Content && (<ProfilePage Content={this.props.Content}/>
    );
  }
}

export default HomePage;
