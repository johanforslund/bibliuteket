import React, { Component } from "react";
import { Text } from "react-native";
import AlgoliaConnect from "../components/AlgoliaConnect";
import CardSection from "../components/CardSection";
import { connect } from "react-redux";
import { monitorBookAdd } from "../actions";
import firebase from "react-native-firebase";

class AddMonitorBookScreen extends Component {
  state = {
    isModalVisible: false
  };

  async componentDidMount() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log("User has permission");
    } else {
      try {
        await firebase.messaging().requestPermission();
      } catch (error) {
        console.log("Error: " + error);
      }
    }
  }

  addBookToMonitor = item => {
    this.props.monitorBookAdd(item.objectID);
  };

  renderListFooter = () => {
    return (
      <CardSection>
        <Text>Du kan tyvärr inte bevaka böcker som inte finns i databasen</Text>
      </CardSection>
    );
  };

  render() {
    return (
      <AlgoliaConnect
        onPressHit={this.addBookToMonitor}
        listFooter={this.renderListFooter}
      />
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  { monitorBookAdd }
)(AddMonitorBookScreen);
