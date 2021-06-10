import { FaGithub, FaLinkedin } from "react-icons/fa";
import {SiGmail, SiCodechef, SiCodeforces} from "react-icons/si";


const ProfileText = (props) => {
    return (
        <div className="profile-text">
            <h4>{props.name}</h4>
            <p>{props.position}</p>
            <p>{props.year}</p>
            <p>
                <a href={props.github}><FaGithub style={{marginRight: 30}}/></a>    
                <a href={props.gmail}><SiGmail style={{marginRight: 30}}/></a> 
                <a href={props.linkedin}><FaLinkedin/></a>
            </p>
            <p>
                <a href={props.codechef}><SiCodechef style={{marginRight: 30}}/></a>  
                <a href={props.codeforces}><SiCodeforces/></a>  
            </p>
        </div>
    )
}

export default ProfileText;