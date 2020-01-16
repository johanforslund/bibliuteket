import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback, Image } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { loginUser } from "../actions";
import CardSection from "../components/CardSection";
import { isLoading } from "../selectors/utilSelectors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const logo = require("../images/inAppLogo.png");

class LoginScreen extends Component {
  state = {
    liuId: "",
    password: ""
  };

  componentDidUpdate(prevProps) {
    if (this.props.loginError !== prevProps.loginError) {
      this.setState({ password: "" });
    }
  }

  validate = () => {
    return {
      liuId: this.state.liuId.length === 0,
      password: this.state.password.length === 0
    };
  };

  onLoginPress() {
    const { liuId, password } = this.state;
    this.props.loginUser({ liuId, password });
  }

  handleRegisterButtonPress() {
    this.props.navigation.navigate("Register");
  }

  handleForgotPWButtonPress() {
    this.props.navigation.navigate("ForgotPW");
  }

  render() {
    const errors = this.validate();
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <CardSection style={{ alignItems: "center", marginTop: 40 }}>
          <Image style={{ width: 200, height: 161 }} source={logo} />
        </CardSection>
        <CardSection>
          <Input
            leftIcon={<Icon color="#a5a5a5" name="person" size={20} />}
            placeholder="LiU-ID"
            placeholderTextColor="#cfcdcc"
            value={this.state.liuId}
            onChangeText={value => this.setState({ liuId: value })}
            onSubmitEditing={() => {
              this.refs.Password.focus();
            }}
            returnKeyType="next"
            autoCapitalize="none"
          />
          <Input
            leftIcon={<Icon color="#a5a5a5" name="lock" size={20} />}
            containerStyle={{ marginBottom: 20 }}
            placeholder="Lösenord"
            placeholderTextColor="#cfcdcc"
            value={this.state.password}
            autoCorrect={false}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={value => this.setState({ password: value })}
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
            disabled={errors.liuId || errors.password}
          />
          <Text style={styles.errorTextStyle}>{this.props.loginError}</Text>
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
      </KeyboardAwareScrollView>
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
  const { loginError } = state.auth;

  const loading = isLoading(["LOGIN_USER"], state);

  return { loginError, loading };
};

export default connect(mapStateToProps, {
  loginUser
})(LoginScreen);
