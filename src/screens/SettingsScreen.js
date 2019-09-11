import React, { Component } from "react";
import { ListItem } from "react-native-elements";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
import { connect } from "react-redux";
import moment from "moment";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import { deleteUser } from "../actions";

class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#CFE3E9" }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.deleteUser();
              console.log("Deleting user...");
            }}
          >
            <ListItem
              title="Ta bort konto"
              leftIcon={{ name: "delete" }}
              bottomDivider
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("pling pling")}>
            <ListItem
              title="Notifikationer"
              leftIcon={{ name: "notifications" }}
              bottomDivider
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;

  return { user };
};

export default connect(
  mapStateToProps,
  { deleteUser }
)(SettingsScreen);
