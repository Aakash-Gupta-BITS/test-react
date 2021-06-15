import ProfileCard from "./profileCard";

const ProfilePage = (props) =>{
    // const lis = [
    //     {
    //         id: 1,
    //         name: "Chinmay Shah",
    //         position: "Member",
    //         year: "2019-Present",
    //         github: "https://github.com/cjshah032",
    //         linkedin: "https://www.linkedin.com/in/chinmay-shah-65a18b195/",
    //         gmail: "mailto:f20190032@pilani.bits-pilani.ac.in"
    //     },
    //     {
    //         id: 2,
    //         name: "Chinmay Shah",
    //         position: "Member",
    //         year: "2019-Present",
    //         github: "https://github.com/cjshah032",
    //         linkedin: "https://www.linkedin.com/in/chinmay-shah-65a18b195/",
    //         gmail: "mailto:f20190032@pilani.bits-pilani.ac.in"
    //     },
    //     {
    //         id: 3,
    //         name: "Chinmay Shah",
    //         position: "Member",
    //         year: "2019-Present",
    //         github: "https://github.com/cjshah032",
    //         linkedin: "https://www.linkedin.com/in/chinmay-shah-65a18b195/",
    //         gmail: "mailto:f20190032@pilani.bits-pilani.ac.in"
    //     },
    //     {
    //         id: 4,
    //         name: "Chinmay Shah",
    //         position: "Member",
    //         year: "2019-Present",
    //         github: "https://github.com/cjshah032",
    //         linkedin: "https://www.linkedin.com/in/chinmay-shah-65a18b195/",
    //         gmail: "mailto:f20190032@pilani.bits-pilani.ac.in"
    //     },
    //     {
    //         id: 5,
    //         name: "Chinmay Shah",
    //         position: "Member",
    //         year: "2019-Present",
    //         github: "https://github.com/cjshah032",
    //         linkedin: "https://www.linkedin.com/in/chinmay-shah-65a18b195/",
    //         gmail: "mailto:f20190032@pilani.bits-pilani.ac.in"
    //     },
    //     {
    //         id: 6,
    //         name: "Chinmay Shah",
    //         position: "Member",
    //         year: "2019-Present",
    //         github: "https://github.com/cjshah032",
    //         linkedin: "https://www.linkedin.com/in/chinmay-shah-65a18b195/",
    //         gmail: "mailto:f20190032@pilani.bits-pilani.ac.in"
    //     },
    //     {
    //         id: 7,
    //         name: "Chinmay Shah",
    //         position: "Member",
    //         year: "2019-Present",
    //         github: "https://github.com/cjshah032",
    //         linkedin: "https://www.linkedin.com/in/chinmay-shah-65a18b195/",
    //         gmail: "mailto:f20190032@pilani.bits-pilani.ac.in"
    //     },
    //     {
    //         id: 8,
    //         name: "Chinmay Shah",
    //         position: "Member",
    //         year: "2019-Present",
    //         github: "https://github.com/cjshah032",
    //         linkedin: "https://www.linkedin.com/in/chinmay-shah-65a18b195/",
    //         gmail: "mailto:f20190032@pilani.bits-pilani.ac.in"
    //     },
    // ];

    const lis = props.Content;
    // for(let i=0; i<8; i++)
    //     lis.push(props.Content);

    const paginate = (lis) => {
        const chunkSize = 4;
        const groups = lis. map((e, i) => {
        return i % chunkSize === 0 ? lis.slice(i, i + chunkSize) : null;
        }). filter(e => { return e; });

        return groups;
    };

    const g = paginate(lis);

    return (
        <>
            <div className="profile-page">
                <h1>Meet Our Team!</h1>
            </div>
            {
                g.map((ls, i) => {
                    return (
                        <div className="profile-page">
                            {
                                ls.map((obj, index) => {
                                    return (
                                        <ProfileCard Content = {g[i][index]} key={index} />
                                    );
                                })   
                            }
                        </div>
                    )
                })
            }
        </>
    )

};

export default ProfilePage;