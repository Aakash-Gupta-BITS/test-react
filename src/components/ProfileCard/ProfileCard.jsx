import React from "react";
import { useState } from "react";
import ProfileText from "./ProfileText";
import ProfileImage from "./ProfileImage";

const ProfileCard = (props) => {
  const [profileUp, setProfileUp] = useState(false);

  const bringUp = () => {
    setProfileUp(true);
  };

  const bringDown = () => {
    setProfileUp(false);
  };

  const {
    name,
    email,
    codechef,
    codeforces,
    atcoder,
    hackerearth,
    hackerrank,
    profileRef,
  } = props.Content;

  return (
    <div
      className={profileUp ? "profile-text-up profile-card" : "profile-card"}
      onMouseOver={bringUp}
      onMouseLeave={bringDown}
    >
      <ProfileImage Link={profileRef} />
      <ProfileText
        name={name}
        position="Member"
        year={email.substr(1, 4)}
        atcoder={atcoder}
        codeforces={codeforces}
        codechef={codechef}
        gmail={"mailto:" + email}
        hackerearth={hackerearth}
        hackerrank={hackerrank}
      />
    </div>
  );
};

export default ProfileCard;
