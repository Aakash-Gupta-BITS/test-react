import {useState} from "react";
import ProfileText from "./profile-text";
import basicImage from "../../resources/basic.jpg"

const ProfileCard = (props) => {
    const [profileUp, setProfileUp] = useState(false);

    const bringUp = () => {
        setProfileUp(true);
    };

    const bringDown = () => {
        setProfileUp(false);
    }

    return (
        <div className={profileUp? "profile-text-up profile-card": "profile-card"} onMouseOver={bringUp} onMouseLeave={bringDown}>
            <img src={basicImage} alt="Image" className="profile-image"/>
            <ProfileText name="Chinmay Shah"
             position="Member" year="2019-Present"
             github="https://github.com/cjshah032" linkedin="https://www.linkedin.com/in/chinmay-shah-65a18b195/"
             gmail="mailto:f20190032@pilani.bits-pilani.ac.in"/>
        </div>
    );
};

export default ProfileCard;