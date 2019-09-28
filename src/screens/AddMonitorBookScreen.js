import React, { Component } from "react";
import AlgoliaConnect from "../components/AlgoliaConnect";

class AddMonitorBookScreen extends Component {
  state = {
    isModalVisible: false
  };

  render() {
    return <AlgoliaConnect purpose="addBook" />;
  }
}

export default AddMonitorBookScreen;
