import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { userUpdate, loginUser } from "../actions";
import CardSection from "../components/CardSection";
import { isLoading } from "../selectors/utilSelectors";

const logo = require("../images/inAppLogo.png");

class LoginScreen extends Component {
  onLoginPress() {
    const { liuid, password } = this.props;
    this.props.loginUser({ liuid, password });
  }

  handleRegisterButtonPress() {
    this.props.navigation.navigate("Register");
  }

  handleForgotPWButtonPress() {
    this.props.navigation.navigate("ForgotPW");
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <CardSection style={{ alignItems: "center", marginTop: 40 }}>
          <Image style={{ width: 200, height: 161 }} source={logo} />
        </CardSection>
        <CardSection>
          <Input
            leftIcon={<Icon color="#a5a5a5" name="person" size={20} />}
            placeholder="LiU-ID"
            value={this.props.liuid}
            onChangeText={value =>
              this.props.userUpdate({ prop: "liuid", value })
            }
            onSubmitEditing={() => {
              this.refs.Password.focus();
            }}
            returnKeyType="next"
          />
          <Input
            leftIcon={<Icon color="#a5a5a5" name="lock" size={20} />}
            containerStyle={{ marginBottom: 20 }}
            placeholder="Lösenord"
            value={this.props.password}
            autoCorrect={false}
            secureTextEntry
            onChangeText={value =>
              this.props.userUpdate({ prop: "password", value })
            }
            ref="Password"
          />
          <Button
            raised
            buttonStyle={{ backgroundColor: "#2ecc71" }}
            textStyle={{ textAlign: "center" }}
            backgroundColor="red"
            title={"Logga in"}
            loading={this.props.loading}
            onPress={this.onLoginPress.bind(this)}
          />
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </CardSection>
        <CardSection style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ alignSelf: "center" }}>Har du inget konto?</Text>
          <TouchableWithoutFeedback
            onPress={this.handleRegisterButtonPress.bind(this)}
          >
            <View>
              <Text style={{ color: "#2ecc71" }}>
                {" "}
                Registrera ditt konto här
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </CardSection>
        <CardSection style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ alignSelf: "center" }}>Glömt lösenord?</Text>
          <TouchableWithoutFeedback
            onPress={this.handleForgotPWButtonPress.bind(this)}
          >
            <View>
              <Text style={{ color: "#a5a5a5" }}> Klicka här</Text>
            </View>
          </TouchableWithoutFeedback>
        </CardSection>
      </ScrollView>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 15,
    alignSelf: "center",
    color: "red"
  }
};

const mapStateToProps = state => {
  const { liuid, password, error } = state.auth;

  const loading = isLoading(["LOGIN_USER"], state);

  return { liuid, password, error, loading };
};

export default connect(
  mapStateToProps,
  {
    userUpdate,
    loginUser
  }
)(LoginScreen);
