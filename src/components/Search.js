import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

class Search extends Component {

  render() {
    return (
      <View>
        <TextInput placeholder="Sök" />
      </View>
    );
  }
}

export default Search;
