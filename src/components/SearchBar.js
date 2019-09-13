import React, { Component } from "react";
import { View, TextInput } from "react-native";
import { connect } from "react-redux";
import { booksFetch, searchUpdate } from "../actions";

class SearchInput extends Component {
  onSearchText(value) {
    // Should be some condition to check #of characters
    this.props.searchUpdate(value);
  }

  render() {
    return (
      <View style={styles.searchStyle}>
        <TextInput
          style={styles.textInputStyle}
          placeholderTextColor="gray"
          placeholder="Sök"
          value={this.props.searchText}
          onChangeText={value => this.onSearchText(value)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { searchText, sorting } = state.books;

  return { searchText, sorting };
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
  { booksFetch, searchUpdate }
)(SearchInput);
