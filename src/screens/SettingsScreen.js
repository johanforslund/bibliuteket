import React, { Component } from "react";
import { ListItem } from "react-native-elements";
import { View, TouchableOpacity } from "react-native";
import RemoveAccount from "../components/RemoveAccount";
import PasswordChanger from "../components/PasswordChanger";

class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#CFE3E9" }}>
        <RemoveAccount />
        <PasswordChanger />
      </View>
    );
  }
}

export default SettingsScreen;
