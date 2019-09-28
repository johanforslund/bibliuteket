import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList
} from "react-native";
import { InstantSearch } from "react-instantsearch/native";
import {
  connectSearchBox,
  connectInfiniteHits
} from "react-instantsearch/connectors";
import NavigationService from "../navigation/NavigationService";
import { ListItem, Input, Button } from "react-native-elements";
import CardSection from "../components/CardSection";
import Card from "../components/Card";
const keys = require("../config/keys");

class AlgoliaConnect extends Component {
  state = {
    searchText: "",
    purpose = "hej"
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <InstantSearch
          appId={keys.algoliaConfig.appId}
          apiKey={keys.algoliaConfig.apiKey}
          indexName={keys.algoliaConfig.indexName}
        >
          <ConnectedSearchBox
            changeText={text => this.setState({ searchText: text })}
          />
          <ConnectedHits searchText={this.state.searchText} />
        </InstantSearch>
      </View>
    );
  }
}

class SearchBox extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            onChangeText={text => {
              this.props.changeText(text);
              this.props.refine(text);
            }}
            value={this.props.currentRefinement}
            label={"Välj bok"}
            placeholder="Titel, författare, kurskod, program..."
          />
        </CardSection>
      </Card>
    );
  }
}

const ConnectedSearchBox = connectSearchBox(SearchBox);

class Hits extends Component {
  renderHit = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(this.state.purpose)
          /*
          if (this.props.purpose === "addBook") {
            NavigationService.navigate("AddBook", {
              storedBook: item
            });
          } else {
            console.log(item);
          }*/
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
      />
    );
  }
}

const ConnectedHits = connectInfiniteHits(Hits);

export default AlgoliaConnect;
