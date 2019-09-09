import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import BookForm from "../components/BookForm";

class AddBookScreen extends Component {
  state = {
    emailVerified: false,
    intervalId: -1
  };

  componentDidMount() {
    if (!firebase.auth().currentUser.emailVerified) {
      this.setState({ intervalId: setInterval(this.retryEmail, 10000) });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  retryEmail = () => {
    firebase
      .auth()
      .currentUser.reload()
      .then(() => {
        if (firebase.auth().currentUser.emailVerified) {
          this.setState({ emailVerified: true });
          clearInterval(this.state.intervalId);
        }
      });
  };

  renderAddBookScreen() {
    if (this.state.emailVerified || firebase.auth().currentUser.emailVerified) {
      return (
        <Card style={{ backgroundColor: "#CFE3E9" }}>
          <BookForm />
        </Card>
      );
    }

    return (
      <Card style={{ backgroundColor: "#CFE3E9" }}>
        <CardSection>
          <Text>
            För att lägga upp en bok behöver du verifiera din email först. Ett
            mail har skickats till: {firebase.auth().currentUser.email}
          </Text>
          <TouchableOpacity onPress={() => this.retryEmail()}>
            <Text>Testa igen</Text>
          </TouchableOpacity>
        </CardSection>
      </Card>
    );
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        {this.renderAddBookScreen()}
      </ScrollView>
    );
  }
}

export default AddBookScreen;
