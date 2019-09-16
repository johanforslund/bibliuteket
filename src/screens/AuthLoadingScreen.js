import React from "react";
import { ActivityIndicator, View } from "react-native";
import firebase from "react-native-firebase"; //eslint-disable-line

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.props.navigation.navigate("App");
      else this.props.navigation.navigate("Auth");
    });
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

export default AuthLoadingScreen;
