import React, { Component } from "react";
import { Text, View } from "react-native";
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

  renderEmptyList = () => {
    return (
      <CardSection>
        <Text>Du kan tyvärr inte bevaka böcker som inte finns i databasen</Text>
      </CardSection>
    );
  };

  renderSearchInfo = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Text style={{ fontSize: 18 }}>
          Sök i databasen på den bok du vill bevaka
        </Text>
        <Text style={{ fontSize: 12 }}>
          Du kommer att få en notifikation när en bok du bevakar läggs upp
        </Text>
      </View>
    );
  };

  render() {
    return (
      <AlgoliaConnect
        onPressHit={this.addBookToMonitor}
        emptyList={this.renderEmptyList}
        searchInfo={this.renderSearchInfo}
      />
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, { monitorBookAdd })(
  AddMonitorBookScreen
);
