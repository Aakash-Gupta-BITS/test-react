import {SiGmail, SiCodechef, SiCodeforces, SiHackerrank, SiHackerearth} from "../../../node_modules/react-icons/si";

const ProfileText = (props) => {
    return (
        <div className="profile-text">
            <h4>{props.name}</h4>
            <p>{props.position}</p>
            <p>{props.year + "  Batch"} </p>
            <p>
                <a href={props.hackerearth}><SiHackerearth style={{marginRight: 30}}/></a>    
                <a href={props.gmail}><SiGmail style={{marginRight: 30}}/></a> 
                <a href={props.hackerrank}><SiHackerrank/></a>
            </p>
            <p>
                <a href={props.codechef}><SiCodechef style={{marginRight: 30}}/></a>  
                <a href={props.codeforces}><SiCodeforces/></a>  
            </p>
        </div>
    )
}

export default ProfileText;