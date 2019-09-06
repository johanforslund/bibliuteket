import React, { Component } from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
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
      <View style={styles.searchStyle}>
        <Icon name="search" style={styles.iconStyle} />
        <TextInput
          style={styles.textInputStyle}
          placeholderTextColor="white"
          placeholder="Sök bok"
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

const styles = {
  searchStyle: {
    flex: 1,
    width: 200,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 8
  },
  iconStyle: {
    marginRight: 8,
    color: "white",
    fontSize: 25
  },
  textInputStyle: {
    color: "white",
    fontSize: 18,
    padding: 2
  }
};

export default connect(mapStateToProps, { booksSearch, booksFetch })(SearchInput);
