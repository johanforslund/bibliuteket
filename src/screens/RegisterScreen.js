import React, { Component } from "react";
import { Text, View } from "react-native";
import { Input, Button, CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { userUpdate, registerUser } from "../actions";
import { isLoading } from "../selectors/bookSelectors";

class RegisterScreen extends Component {
  onRegisterPress() {
    const { name, liuid, password } = this.props;
    this.props.registerUser({ name, liuid, password });
  }

  render() {
    return (
      <View>
        <Input
          placeholder="Ditt namn"
          value={this.props.name}
          onChangeText={value => this.props.userUpdate({ prop: "name", value })}
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
        <View>
          <CheckBox
            size={20}
            center
            title="I agree to GDPR"
            onPress={() => {
              console.log("");
            }}
            checked={true}
          />
        </View>
        <Button
          raised
          buttonStyle={{ backgroundColor: "#2ecc71" }}
          textStyle={{ textAlign: "center" }}
          backgroundColor="red"
          title={"Registrera"}
          loading={this.props.loading}
          onPress={this.onRegisterPress.bind(this)}
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
