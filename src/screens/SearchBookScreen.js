import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";

import firebase from "react-native-firebase"; //eslint-disable-line
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

    return <AlgoliaConnect purpose="addBook" />;
  }
}

const ConnectedSearchBox = connectSearchBox(SearchBox);

class Hits extends Component {
  renderHit = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationService.navigate("AddBook", {
            storedBook: item
          });
        }}
      >
        <ListItem title={item.title} subtitle={item.author} bottomDivider />
      </TouchableOpacity>
    );
  };

  keyExtractor = item => {
    return item.objectID;
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

  render() {
    if (this.props.searchText.length < 2)
      return (
        <Card style={{ marginTop: 20 }}>
          <CardSection>
            <Text>1. Sök på den bok du vill sälja</Text>
            <Text>2. Sök på den bok du vill sälja</Text>
            <Text>3. Sök på den bok du vill sälja</Text>
          </CardSection>
        </Card>
      );

    return (
      <FlatList
        style={{ marginBottom: 100 }}
        data={this.props.hits}
        renderItem={this.renderHit}
        keyExtractor={this.keyExtractor}
        ListFooterComponent={this.renderListFooter}
        keyboardShouldPersistTaps="handled"
      />
    );
  }
}

const ConnectedHits = connectInfiniteHits(Hits);

export default SearchBookScreen;
