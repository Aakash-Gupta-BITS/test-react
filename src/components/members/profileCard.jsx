import React, { Component } from 'react';
import {useState} from "react";
import ProfileText from "./profile-text";
import ProfileImage from '../../pages/images'

const ProfileCard = (props) => {
    const [profileUp, setProfileUp] = useState(false);

    const bringUp = () => {
        setProfileUp(true);
    };

    const bringDown = () => {
        setProfileUp(false);
    }

    const {
        name,
        email,
        bitsId,
        codechef,
        codeforces,
        atcoder,
        hackerearth,
        hackerrank,
        profileref,
        onInfoClick
    } = props.Content;
    console.log(props.Content);
    // TODO: add component. If any of profile linnk is not available, don't show that icon
    // console.log(this.props);
    return ( 
        <React.Fragment>
            <div className={profileUp? "profile-text-up profile-card": "profile-card"} onMouseOver={bringUp} onMouseLeave={bringDown}>
                {/* <img src="image.jpeg" alt="Image" className="profile-image"/> */}
                <ProfileImage Content = {props.Content}/>
                <ProfileText name={name}
                position="Member" year={email.substr(1,4)} atcoder = {atcoder} codeforces = {codeforces} codechef = {codechef}
                gmail={"mailto:" + {email}}/>
            </div>
        </React.Fragment>
     );
}
 
export default ProfileCard;