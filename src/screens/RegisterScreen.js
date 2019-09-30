import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Input, Button, CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { userUpdate, registerUser } from "../actions";
import { isLoading } from "../selectors/utilSelectors";
import Card from "../components/Card";
import CardSection from "../components/CardSection";

class RegisterScreen extends Component {
  state = {
    name: "",
    liuId: "",
    password: "",
    isChecked: false
  };

  validate = () => {
    return {
      name: this.state.name.length === 0,
      liuId: this.state.liuId.length === 0,
      password: this.state.password.length === 0
    };
  };

  onRegisterPress() {
    const { name, liuId, password } = this.state;
    this.props.registerUser({ name, liuId, password });
  }

  handleTOSPress() {
    this.props.navigation.navigate("TOS");
  }

  render() {
    const errors = this.validate();
    return (
      <View style={{ flex: 1, backgroundColor: "#CFE3E9" }}>
        <Card>
          <CardSection>
            <Input
              placeholder="Ditt namn"
              value={this.state.name}
              onChangeText={value => this.setState({ name: value })}
            />
            <Input
              placeholder="LiU-ID"
              value={this.state.liuId}
              onChangeText={value => this.setState({ liuId: value })}
              maxLength={8}
              autoCapitalize="none"
            />
            <Input
              placeholder="Lösenord"
              value={this.state.password}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={value => this.setState({ password: value })}
            />
            <Text style={styles.errorTextStyle}>
              {this.props.registerError}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                flexWrap: "wrap"
              }}
            >
              <CheckBox
                size={20}
                onPress={() => {
                  if (this.state.isChecked) this.setState({ isChecked: false });
                  else this.setState({ isChecked: true });
                }}
                checkedColor="green"
                checked={this.state.isChecked}
              />
              <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1 }}>
                <Text>Jag accepterar</Text>
                <TouchableOpacity onPress={this.handleTOSPress.bind(this)}>
                  <Text style={{ color: "#2ecc71" }}>
                    {" "}
                    Personuppgiftspolicyn{" "}
                  </Text>
                </TouchableOpacity>
                <Text>för Bibliuteket</Text>
              </View>
            </View>
            <Button
              disabled={
                !this.state.isChecked ||
                errors.name ||
                errors.liuId ||
                errors.password
              }
              raised
              buttonStyle={{ backgroundColor: "#2ecc71" }}
              textStyle={{ textAlign: "center" }}
              backgroundColor="red"
              title={"Registrera"}
              loading={this.props.loading}
              onPress={this.onRegisterPress.bind(this)}
            />
          </CardSection>
        </Card>
      </View>
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
  const { registerError } = state.auth;

  const loading = isLoading(["REGISTER_USER"], state);

  return { registerError, loading };
};

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(RegisterScreen);
