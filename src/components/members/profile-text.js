import {SiGmail, SiCodechef, SiCodeforces, SiHackerrank, SiHackerearth} from "../../../node_modules/react-icons/si";
import { IconContext } from "react-icons";

const ProfileText = (props) => {
    return (
        <IconContext.Provider value={{color: "black"}}>
            <div className="profile-text">
                <h4>{props.name}</h4>
                <p>{props.position}</p>
                <p>{props.year + "  Batch"} </p>
                <p>
                    <a href={props.hackerearth} target="_blank"><SiHackerearth style={{marginRight: 30}}/></a>    
                    <a href={props.gmail} target="_blank"><SiGmail style={{marginRight: 30}}/></a> 
                    <a href={props.hackerrank} target="_blank"><SiHackerrank/></a>
                </p>
                <p>
                    <a href={props.codechef} target="_blank"><SiCodechef style={{marginRight: 30}}/></a>  
                    <a href={props.codeforces} target="_blank"><SiCodeforces/></a>  
                </p>
            </div>
        </IconContext.Provider>
    )
}

export default ProfileText;
