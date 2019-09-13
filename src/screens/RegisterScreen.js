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
    isChecked: false
  };

  onRegisterPress() {
    const { name, liuid, password } = this.props;
    this.props.registerUser({ name, liuid, password });
  }

  handleTOSPress() {
    this.props.navigation.navigate("TOS");
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#CFE3E9" }}>
        <Card>
          <CardSection>
            <Input
              placeholder="Ditt namn"
              value={this.props.name}
              onChangeText={value =>
                this.props.userUpdate({ prop: "name", value })
              }
            />
            <Input
              placeholder="LiU-ID"
              value={this.props.liuid}
              onChangeText={value =>
                this.props.userUpdate({ prop: "liuid", value })
              }
              maxLength={8}
            />
            <Input
              placeholder="Lösenord"
              value={this.props.password}
              autoCorrect={false}
              secureTextEntry
              onChangeText={value =>
                this.props.userUpdate({ prop: "password", value })
              }
            />
            <Text style={styles.errorTextStyle}>{this.props.error}</Text>
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
              disabled={!this.state.isChecked}
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
  const { name, liuid, password, error } = state.auth;

  const loading = isLoading(["REGISTER_USER"], state);

  return { name, liuid, password, error, loading };
};

export default connect(
  mapStateToProps,
  {
    userUpdate,
    registerUser
  }
)(RegisterScreen);
