import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, TextInput } from "react-native";
import { connect } from "react-redux";
import { booksSearch, booksFetch, toggleSearch } from "../actions";
import { SearchBar } from "react-native-elements";
import ModifySearch from "../components/ModifySearch";

class SearchInput extends Component {
  state = {
    search: ""
  };

  onSearchText(value) {
    this.setState({ search: value });

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
    const { search } = this.state;
    return (
      <View
        style={{
          height: 57,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#29749D"
        }}
      >
        <SearchBar
          placeholder="Sök"
          onChangeText={value => this.onSearchText(value)}
          value={search}
          containerStyle={{
            width: "90%",
            height: "100%",
            backgroundColor: "#29749D",
            borderBottomColor: "transparent",
            borderTopColor: "transparent"
          }}
          inputContainerStyle={{
            backgroundColor: "#F9FAFA"
          }}
          inputStyle={{
            padding: 0,
            textAlignVertical: "center"
          }}
          round={true}
        />
        <ModifySearch />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { searchTitle, sorting } = state.books;

  return { searchTitle, sorting };
};

export default connect(
  mapStateToProps,
  { booksSearch, booksFetch, toggleSearch }
)(SearchInput);
