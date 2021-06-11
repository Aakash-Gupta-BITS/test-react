import { Component } from "react";
import vars from "../services/config";

const storage = vars.getStorage();

class ProfileImage extends Component {
	state = {imglink: null};
	async componentDidMount() {
		console.log(this.props);
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
		return <img src={this.state.imglink} width = "100" height = "100"></img>;   
	}
}
export default ProfileImage;