import ProfileCard from "../components/ProfileCard/ProfileCard";

const ProfilePage = (props) => {
  const lis = props.Content;
  const paginate = (lis) => {
    const chunkSize = 4;
    const groups = lis
      .map((e, i) => {
        return i % chunkSize === 0 ? lis.slice(i, i + chunkSize) : null;
      })
      .filter((e) => {
        return e;
      });

    return groups;
  };

  const g = paginate(lis);

  return (
    <>
      <div className="profile-page">
        <h1>Meet Our Team!</h1>
      </div>
      {g.map((ls, i) => {
        return (
          <div key={i} className="profile-page">
            {ls.map((obj, index) => {
              return (
                <ProfileCard key={index} Content={g[i][index]} />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default ProfilePage;
