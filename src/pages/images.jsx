import { Component } from "react";
import vars from "../services/config";
import basicImage from "../resources/anime-digital-art-artwork-2d-portrait-display-hd-wallpaper-preview.jpg"
const storage = vars.getStorage();

class ProfileImage extends Component {
	state = {imglink: basicImage};
	async componentDidMount() {
		// console.log(this.props);
		await this.getLink(this.props.Content.profileRef);
	}
	async getLink(url){
		try{
		const imglink = await storage.ref().child(url).getDownloadURL();
		this.setState({imglink});
		}catch(ex){
		console.log(ex);
		}
	}
	render() {
		return <img src={this.state.imglink} className="profile-image"></img>;   
	}
}
export default ProfileImage;