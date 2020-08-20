import React, { Component } from "react";
import { View, Platform } from "react-native";
import { connect } from "react-redux";
import { booksFetch, searchUpdate } from "../actions";
import { SearchBar } from "react-native-elements";
import ModifySearch from "../components/ModifySearch";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";

class SearchInput extends Component {
  render() {
    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#29749D",
              paddingTop: insets.top,
            }}
          >
            <SearchBar
              placeholder="Sök"
              returnKeyType="done"
              placeholderTextColor="#cfcdcc"
              value={this.props.searchText}
              onChangeText={(value) => this.props.searchUpdate(value)}
              containerStyle={{
                width: "90%",
                height: "100%",
                backgroundColor: "#29749D",
                borderBottomColor: "transparent",
                borderTopColor: "transparent",
              }}
              inputContainerStyle={{
                backgroundColor: "#F9FAFA",
              }}
              inputStyle={{
                padding: 0,
                textAlignVertical: "center",
              }}
              round={true}
            />
            <ModifySearch />
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

const mapStateToProps = (state) => {
  const { searchText, sorting } = state.books;

  return { searchText, sorting };
};

export default connect(
  mapStateToProps,
  { booksFetch, searchUpdate }
)(SearchInput);
