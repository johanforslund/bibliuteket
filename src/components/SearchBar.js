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
        <Icon name="search" style={styles.iconStyle} />
        <TextInput
          style={styles.textInputStyle}
          placeholderTextColor="gray"
          placeholder="Sök bok..."
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
    width: 270,
    display: "flex",
    flexDirection: "row",
    marginLeft: 8
  },
  iconStyle: {
    marginRight: 8,
    color: "white",
    fontSize: 30,
    alignSelf: "center",
    justifySelf: "center"
  },
  textInputStyle: {
    width: "100%",
    color: "black",
    fontSize: 18,
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderRadius: 10
  }
};

export default connect(
  mapStateToProps,
  { booksSearch, booksFetch, toggleSearch }
)(SearchInput);
