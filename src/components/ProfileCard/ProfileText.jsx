import {
  SiGmail,
  SiCodechef,
  SiCodeforces,
  SiHackerrank,
  SiHackerearth,
} from "react-icons/si";
import { IconContext } from "react-icons";

const ProfileText = ({
  name,
  position,
  year,
  atcoder,
  codeforces,
  codechef,
  gmail,
  hackerearth,
  hackerrank,
}) => {
  return (
    <IconContext.Provider value={{ color: "black" }}>
      <div className="profile-text">
        <h4>{name}</h4>
        <p>{position}</p>
        <p>{year + "  Batch"} </p>
        <p>
          <a href={hackerearth} target="_blank" rel="noreferrer">
            <SiHackerearth style={{ marginRight: 30 }} />
          </a>
          <a href={gmail} target="_blank" rel="noreferrer">
            <SiGmail style={{ marginRight: 30 }} />
          </a>
          <a href={hackerrank} target="_blank" rel="noreferrer">
            <SiHackerrank />
          </a>
        </p>
        <p>
          <a href={codechef} target="_blank" rel="noreferrer">
            <SiCodechef style={{ marginRight: 30 }} />
          </a>
          <a href={codeforces} target="_blank" rel="noreferrer">
            <SiCodeforces />
          </a>
        </p>
      </div>
    </IconContext.Provider>
  );
};

export default ProfileText;
