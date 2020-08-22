import React from "react";
import { ActivityIndicator, View } from "react-native";
import firebase from "@react-native-firebase/app"; //eslint-disable-line

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.props.navigation.navigate("App");
        const fcmToken = await firebase.messaging().getToken();

        firebase
          .database()
          .ref(
            "users/" +
              firebase.auth().currentUser.uid +
              "/notificationTokens/" +
              fcmToken
          )
          .set(true);
      } else this.props.navigation.navigate("Auth");
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
