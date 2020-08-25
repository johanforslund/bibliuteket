import React, { Component, Fragment } from "react";
import { ListItem, Input, Button } from "react-native-elements";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Modal from "react-native-modal";
import firebase from "react-native-firebase"; //eslint-disable-line
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-root-toast";

import { updateUserPassword, reAuthenticate } from "../actions";

import { isLoading } from "../selectors/utilSelectors";

class PasswordChanger extends Component {
  state = {
    isModalVisible: false,
    liuId: "",
    password: "",
    newPassword: ""
  };

  toggleModal() {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      liuId: "",
      password: "",
      newPassword: ""
    });
  }

  async handleNewPwPress() {
    await this.props.updateUserPassword(this.state.newPassword);
    if (this.props.newPWError === "") {
      this.toggleModal();
      Toast.show("Ditt lösenord har ändrats");
    }
  }

  renderCredentialFields() {
    return (
      <Fragment>
        <Text style={styles.titleStyle}>
          Ange dina uppgifter för att byta lösenord
        </Text>
        <Input
          ref="LiuId"
          returnKeyType="next"
          leftIcon={<Icon color="#a5a5a5" name="person" size={20} />}
          placeholder="LiU-ID"
          placeholderTextColor="#cfcdcc"
          onSubmitEditing={() => {
            this.refs.Password.focus();
          }}
          value={this.state.liuId}
          onChangeText={value => this.setState({ liuId: value })}
        />
        <Input
          ref="Password"
          returnKeyType="next"
          secureTextEntry
          autoCapitalize="none"
          placeholder="Lösenord"
          placeholderTextColor="#cfcdcc"
          leftIcon={<Icon color="#a5a5a5" name="lock" size={20} />}
          inputStyle={styles.inputStyle}
          value={this.state.password}
          onChangeText={value => this.setState({ password: value })}
        />

        <Button
          title="Bekräfta"
          loading={this.props.loadingCredentials}
          onPress={() =>
            this.props.reAuthenticate(this.state.liuId, this.state.password)
          }
          buttonStyle={styles.buttonStyle}
        />
      </Fragment>
    );
  }

  renderNewPWField() {
    return (
      <Fragment>
        <Text style={styles.titleStyle}>Ange ditt nya lösenord</Text>
        <Input
          ref="newPassword"
          returnKeyType="next"
          secureTextEntry
          autoCapitalize="none"
          placeholder="Nytt lösenord"
          placeholderTextColor="#cfcdcc"
          leftIcon={<Icon color="#a5a5a5" name="lock" size={20} />}
          inputStyle={styles.inputStyle}
          value={this.state.newPassword}
          onChangeText={value => this.setState({ newPassword: value })}
        />

        {this.props.newPWError ? (
          <Text style={styles.errorTextStyle}>{this.props.newPWError}</Text>
        ) : null}

        <Button
          title={"Bekräfta"}
          disabled={this.state.newPassword.length < 1}
          loading={this.props.loadingNewPW}
          onPress={this.handleNewPwPress.bind(this)}
          buttonStyle={styles.buttonStyle}
        />
      </Fragment>
    );
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          delayPressIn={50}
          onPress={this.toggleModal.bind(this)}
        >
          <ListItem
            title="Byt lösenord"
            leftIcon={{ name: "lock" }}
            bottomDivider
          />
        </TouchableOpacity>
        <Modal
          useNativeDriver={true}
          animationIn="slideInDown"
          animationOut="slideOutUp"
          isVisible={this.state.isModalVisible}
          onBackdropPress={this.toggleModal.bind(this)}
        >
          <View style={styles.modalContainerStyle}>
            {this.props.hasRecentlyAuth
              ? this.renderNewPWField()
              : this.renderCredentialFields()}
            <Button
              title="Avbryt"
              onPress={this.toggleModal.bind(this)}
              type="clear"
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { newPWError, hasRecentlyAuth } = state.auth;
  const loadingNewPW = isLoading(["UPDATE_USER_PASSWORD"], state);
  const loadingCredentials = isLoading(["REAUTHENTICATE_USER"], state);
  return { loadingNewPW, loadingCredentials, newPWError, hasRecentlyAuth };
};

const styles = {
  titleStyle: {
    color: "black",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalContainerStyle: {
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  inputStyle: {
    paddingVertical: 0
  },
  buttonStyle: {
    marginTop: 40,
    width: 150
  },
  errorTextStyle: {
    fontSize: 15,
    textAlign: "center",
    color: "red"
  }
};

export default connect(
  mapStateToProps,
  { updateUserPassword, reAuthenticate }
)(PasswordChanger);
