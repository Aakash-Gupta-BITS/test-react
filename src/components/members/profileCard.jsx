import React, { Component } from 'react';

const ProfileCard = (props) => {
    const {
        Name,
        Email,
        BitsID,
        codechef,
        codeforces,
        atcoder,
        hackerearth,
        hackerrank,
        onInfoClick
    } = props;

    const endYearString = (ID) =>{
        // TODO: based on year and branch (dual or single), return the ending year
        return "Present";
    }

    const JoinYear = BitsID.substring(0, 4);
    const EndYear = endYearString(BitsID);

    // TODO: add component. If any of profile linnk is not available, don't show that icon
    return ( 
        <React.Fragment>

        </React.Fragment>
     );
}
 
export default ProfileCard;