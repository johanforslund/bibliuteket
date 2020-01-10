import React, { Component } from "react";
import { ListItem } from "react-native-elements";
import { View, TouchableOpacity } from "react-native";
import RemoveAccount from "../components/RemoveAccount";

class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#CFE3E9" }}>
        <View>
          <RemoveAccount />
        </View>
      </View>
    );
  }
}

export default SettingsScreen;
