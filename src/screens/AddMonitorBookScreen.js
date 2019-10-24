import React, { Component } from "react";
import { Text } from "react-native";
import AlgoliaConnect from "../components/AlgoliaConnect";
import CardSection from "../components/CardSection";
import { connect } from "react-redux";
import { monitorBookAdd } from "../actions";

class AddMonitorBookScreen extends Component {
  state = {
    isModalVisible: false
  };

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
