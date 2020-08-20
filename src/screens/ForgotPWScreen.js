import React, { Component } from "react";
import { Text, View, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from "react-native-firebase"; //eslint-disable-line
import Toast from "react-native-root-toast";

class ForgotPWScreen extends Component {
  state = {
    liuid: "",
  };

  render() {
    return (
      <View>
        <Input
          placeholder="LiU-ID"
          placeholderTextColor="#cfcdcc"
          value={this.props.liuid}
          onChangeText={(value) => this.setState({ liuid: value })}
        />
        <Button
          raised
          buttonStyle={{ backgroundColor: "#2ecc71", marginTop: 10 }}
          textStyle={{ textAlign: "center" }}
          title={"Återställ lösenord"}
          onPress={() => {
            firebase
              .auth()
              .sendPasswordResetEmail(this.state.liuid + "@student.liu.se")
              .then(() => {
                Toast.show("En återställningslänk har skickats till din mail");
                this.props.navigation.navigate("Login");
              })
              .catch((error) => {
                Alert.alert(
                  "Det finns ingen användare med detta LiU-ID",
                  "Ange korrekt uppgifter för att återställa ditt lösenord",
                  [
                    {
                      text: "OK",
                    },
                  ]
                );
              });
          }}
        />

        <Text style={styles.errorTextStyle}>{this.props.error}</Text>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 15,
    alignSelf: "center",
    color: "red",
  },
};

export default ForgotPWScreen;
