import { Component } from "react";
import vars from "../services/config";
import basicImage from "../resources/anime-digital-art-artwork-2d-portrait-display-hd-wallpaper-preview.jpg"
const storage = vars.getStorage();

class ProfileImage extends Component {
	state = {imglink: null};
	async componentDidMount() {
		// console.log(this.props);
		await this.getLink(this.props.Content.profileRef);
	}
	async getLink(url){
		try{
            var imglink = await storage.ref().child(url).getDownloadURL();            
		} catch(ex){
		    // console.log(ex);
			imglink = await storage.ref().child('/Profile Images/basic.jpg').getDownloadURL();
		}
		this.setState({imglink});
	}
	render() {
		return <img src={this.state.imglink === null ? basicImage : this.state.imglink} className="profile-image"></img>;   
	}
}
export default ProfileImage;