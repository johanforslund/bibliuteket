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
import { ListItem, Input, Button, SearchBar } from "react-native-elements";
import CardSection from "../components/CardSection";
import Card from "../components/Card";
const keys = require("../config/keys");

class AlgoliaConnect extends Component {
  state = {
    searchText: ""
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
          <ConnectedHits
            onPressHit={this.props.onPressHit}
            searchText={this.state.searchText}
            listFooter={this.props.listFooter}
            searchInfo={this.props.searchInfo}
          />
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
      <TouchableOpacity onPress={() => this.props.onPressHit(item)}>
        <ListItem title={item.title} subtitle={item.author} bottomDivider />
      </TouchableOpacity>
    );
  };

  keyExtractor = item => {
    return item.objectID;
  };

  render() {
    if (this.props.searchText.length < 2)
      return (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "50%"
          }}
        >
          {this.props.searchInfo()}
        </View>
      );

    return (
      <FlatList
        style={{
          marginBottom: 100
        }}
        data={this.props.hits}
        renderItem={this.renderHit}
        keyExtractor={this.keyExtractor}
        ListFooterComponent={this.props.listFooter}
      />
    );
  }
}

const ConnectedHits = connectInfiniteHits(Hits);

export default AlgoliaConnect;
