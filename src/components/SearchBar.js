import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, TextInput } from "react-native";
import { connect } from "react-redux";
import { booksSearch, booksFetch, toggleSearch } from "../actions";

class SearchInput extends Component {
  onSearchText(value) {
    if (value.length === 0) {
      this.props.booksFetch(this.props.sorting);
      this.props.toggleSearch(false, value);
    }
    if (value.length > 2) {
      this.props.booksSearch(this.props.sorting, value);
      this.props.toggleSearch(true, value);
    }
  }

  render() {
    return (
      <View style={styles.searchStyle}>
        <TextInput
          style={styles.textInputStyle}
          placeholderTextColor="gray"
          placeholder="Sök"
          onChangeText={value => this.onSearchText(value)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { searchTitle, sorting } = state.books;

  return { searchTitle, sorting };
};

const styles = {
  searchStyle: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    width: 300,
    marginLeft: 8
  },
  textInputStyle: {
    height: 36,
    width: "100%",
    color: "black",
    fontSize: 12,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20
  }
};

export default connect(
  mapStateToProps,
  { booksSearch, booksFetch, toggleSearch }
)(SearchInput);
