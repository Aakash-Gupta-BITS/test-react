import { Component } from "react";
import vars from "../../services/config";
import basicImage from "../resources/basic.jpg";
const storage = vars.getStorage();

class ProfileImage extends Component {
  state = { imglink: basicImage };

  async componentDidMount() {
    var imglink = await storage.ref().child(this.props.Link).getDownloadURL();
    this.setState({ imglink });
  }

  render() {
    return <img src={this.state.imglink} className="profile-image"></img>;
  }
}
export default ProfileImage;
