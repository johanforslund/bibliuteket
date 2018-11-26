import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { booksSearch, booksFetch } from '../actions';

class SearchInput extends Component {
  onSearchText(value) {
    if (value.length === 0) this.props.booksFetch();
    if (value.length > 2) this.props.booksSearch(value);
  }

  render() {
    return (
      <View style={{ flex: 1, width: 200 }}>
        <TextInput
          style={{ color: 'white' }}
          placeholderTextColor="white"
          underlineColorAndroid="white"
          placeholder="Sök bok..."
          onChangeText={value => this.onSearchText(value)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { searchTitle } = state.books;

  return { searchTitle };
};

export default connect(mapStateToProps, { booksSearch, booksFetch })(SearchInput);
