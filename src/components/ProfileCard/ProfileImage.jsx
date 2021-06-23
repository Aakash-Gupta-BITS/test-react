import { Component } from "react";
// import { getStorage } from "../../services/firebase";
import Basic from "../../resources/basic.jpg";

// const storage = getStorage();

class ProfileImage extends Component {
  state = { imglink: Basic };

  async componentDidMount() {
    try{
      // var imglink = await storage.ref().child(this.props.Link).getDownloadURL();
    } catch(ex) {
      // imglink = await storage.ref().child("Profile Images/basic.jpg").getDownloadURL();
    } 
    // this.setState({ imglink });
  }

  render() {
    return <img src={this.state.imglink} alt="No Profile" className="profile-image"></img>;
  }
}
export default ProfileImage;
