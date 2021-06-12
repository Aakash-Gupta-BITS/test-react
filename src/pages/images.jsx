import { Component } from "react";
import vars from "../services/config";
import basicImage from "../resources/2345244.jpg"
const storage = vars.getStorage();

class ProfileImage extends Component {
	state = {imglink: null};
	async componentDidMount() {
		// console.log(this.props);
		await this.getLink(this.props.Content.profileref);
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
		return <img src={basicImage} className="profile-image"></img>;   
	}
}
export default ProfileImage;