import React, { Component } from "react";
import ReactJson from 'react-json-view';

class HomePage extends Component {
  
  render() {
    return this.props.Content && (<ReactJson src={this.props.Content}/>
    );
  }
}

export default HomePage;
