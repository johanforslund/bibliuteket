import React, { Component } from "react";
import { ListItem, Input, Button } from "react-native-elements";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import Modal from "react-native-modal";
import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { deleteUser, bookDelete } from "../actions";
import { isLoading } from "../selectors/utilSelectors";

class RemoveAccount extends Component {
  state = {
    isModalVisible: false,
    liuId: "",
    password: ""
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          delayPressIn={50}
          onPress={() => {
            this.setState({
              isModalVisible: !this.state.isModalVisible
            });
          }}
        >
          <ListItem
            title="Ta bort konto"
            leftIcon={{ name: "delete" }}
            bottomDivider
          />
        </TouchableOpacity>
        <Modal
          useNativeDriver={true}
          animationIn="slideInDown"
          animationOut="slideOutUp"
          isVisible={this.state.isModalVisible}
          onBackdropPress={() =>
            this.setState({
              isModalVisible: !this.state.isModalVisible
            })
          }
        >
          <View style={styles.modalContainerStyle}>
            <Text style={styles.titleStyle}>
              Ange dina uppgifter för att ta bort kontot
            </Text>

            <Input
              ref="LiuId"
              returnKeyType="next"
              leftIcon={<Icon color="#a5a5a5" name="person" size={20} />}
              placeholder="LiU-ID"
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
              leftIcon={<Icon color="#a5a5a5" name="lock" size={20} />}
              inputStyle={styles.inputStyle}
              value={this.state.password}
              onChangeText={value => this.setState({ password: value })}
            />

            <Button
              title="Ta bort konto"
              loading={this.props.loading}
              onPress={() => {
                var credentials = firebase.auth.EmailAuthProvider.credential(
                  this.state.liuId + "@student.liu.se",
                  this.state.password
                );

                firebase
                  .auth()
                  .currentUser.reauthenticateWithCredential(credentials)
                  .then(() => {
                    if (this.props.profileBooks) {
                      this.props.profileBooks.map(profileBook => {
                        this.props.bookDelete(
                          profileBook.uid,
                          profileBook.imageURL
                        );
                      });
                    }
                    this.props.deleteUser();
                  })
                  .catch(error => {
                    console.log(error);
                    Alert.alert(
                      "Uppgifterna stämmer inte",
                      "Ange korrekt uppgifter för att ta bort konto",
                      [
                        {
                          text: "OK"
                        }
                      ]
                    );
                  });
              }}
              buttonStyle={styles.buttonStyle}
            />
            <Button
              title="Avbryt"
              onPress={() =>
                this.setState({
                  isModalVisible: !this.state.isModalVisible
                })
              }
              type="clear"
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const loading = isLoading(["DELETE_USER"], state);
  const { user } = state.auth;
  const { profileBooks } = state.profile;
  return { user, profileBooks, loading };
};

const styles = {
  iconStyle: {
    marginRight: 8,
    color: "white",
    fontSize: 35
  },
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
    backgroundColor: "red",
    marginTop: 40,
    width: 150
  }
};

export default connect(
  mapStateToProps,
  { deleteUser, bookDelete }
)(RemoveAccount);
