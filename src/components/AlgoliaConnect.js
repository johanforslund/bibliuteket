import React, { Component } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { InstantSearch } from "react-instantsearch/native";
import {
  connectSearchBox,
  connectInfiniteHits
} from "react-instantsearch/connectors";
import NavigationService from "../navigation/NavigationService";
import { ListItem, Input, Button } from "react-native-elements";

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
            emptyList={this.props.emptyList}
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
      <View style={{ marginTop: 10 }}>
        <Input
          onChangeText={text => {
            this.props.changeText(text);
            this.props.refine(text);
          }}
          value={this.props.currentRefinement}
          label={"Välj bok"}
          placeholderTextColor="#cfcdcc"
          returnKeyType="done"
          placeholder="Titel, författare, kurskod, program..."
        />
      </View>
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
        style={{ marginBottom: 100 }}
        data={this.props.hits}
        keyboardShouldPersistTaps={"handled"}
        renderItem={this.renderHit}
        keyExtractor={this.keyExtractor}
        ListFooterComponent={this.props.listFooter}
        ListEmptyComponent={this.props.emptyList}
      />
    );
  }
}

const ConnectedHits = connectInfiniteHits(Hits);

export default AlgoliaConnect;
