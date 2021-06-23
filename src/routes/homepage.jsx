import React, {Component} from "react";
import { signOut } from "../services/authenticate.js";
import { storageAuthUsername } from "../config/storageVars";
import ProfilePage from "./ProfilePage";
import { reactLocalStorage } from "reactjs-localstorage";
import TopNavigationBar from "../components/TopNavBar.jsx";

class HomePage extends Component {
  state = {
    comp: "",
  };

  render() {
    const { showLoading, onSignChange, teamJSON, showToast } = this.props;
    const userName = reactLocalStorage.get(storageAuthUsername, null);

    return (
      <>
        <TopNavigationBar
          title={`Welcome ${userName}!!`}
          names={["Team", "Blogs", "Q/A", "Developers", "Sign Out" ]}
          onClick={async (name) => {
            switch (name) {
              case "Team":
                this.setState({ comp: <ProfilePage Content={teamJSON} />});
                break;

              case "Blogs":
                this.setState({ comp: "Blogs will appear here"});
                break;

              case "Q/A":
                this.setState({ comp: "Q/A will appear here"});
                break;

              case "Developers":
                this.setState({comp: "Developer list will appear here"});
                break;

              case "Sign Out":
                showLoading(true);
                try {
                  await signOut();
                } catch (ex) {
                  showToast(ex.message, "error");
                }
                showLoading(false);
                onSignChange();
            }
          }}
        />
        <div>{this.state.comp}</div>
      </>
    );
  }
}
export default HomePage;
