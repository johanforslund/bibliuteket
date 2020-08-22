import React, { Component } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Button } from "react-native-elements";
import NavigationService from "../navigation/NavigationService";
import firebase from "@react-native-firebase/app"; //eslint-disable-line
import CardSection from "../components/CardSection";
import Card from "../components/Card";
import AlgoliaConnect from "../components/AlgoliaConnect";

class SearchBookScreen extends Component {
  state = {
    emailVerified: false,
    intervalId: -1,
    searchText: ""
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

  navigateToBook = item => {
    NavigationService.navigate("AddBook", {
      storedBook: item
    });
  };

  renderListFooter = () => {
    return (
      <CardSection>
        <Button
          title="Jag hittar inte boken"
          raised
          onPress={() => this.props.navigation.navigate("AddBook")}
        />
      </CardSection>
    );
  };

  renderSearchInfo = () => {
    return (
      <View>
        <Text style={{ fontSize: 18 }}>
          Sök i databasen på den bok du vill sälja
        </Text>
      </View>
    );
  };

  render() {
    if (
      !this.state.emailVerified &&
      !firebase.auth().currentUser.emailVerified
    ) {
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

    return (
      <AlgoliaConnect
        onPressHit={this.navigateToBook}
        listFooter={this.renderListFooter}
        searchInfo={this.renderSearchInfo}
      />
    );
  }
}

export default SearchBookScreen;
