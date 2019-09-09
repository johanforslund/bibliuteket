import React, { Component } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
import { booksFetch, fetchUser } from "../actions";
import BookDetail from "../components/BookDetail";
import SearchBar from "../components/SearchBar";
import ModifySearch from "../components/ModifySearch";

class BookListScreen extends Component {
  static navigationOptions = {
    headerLeft: <SearchBar />,
    headerRight: <ModifySearch />
  };

  componentWillMount() {
    this.props.booksFetch(this.props.sorting);
    if (this.props.user.displayName === undefined) {
      this.props.fetchUser(firebase.auth().currentUser);
    }
  }

  handlePress = book => {
    this.props.navigation.navigate("Book", { book });
  };

  renderBook = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.handlePress(item)}>
        <BookDetail book={item} />
      </TouchableOpacity>
    );
  };

  keyExtractor = item => item.date.toString();

  render() {
    return (
      <FlatList
        data={this.props.books}
        renderItem={this.renderBook}
        keyExtractor={this.keyExtractor}
        style={{ flex: 1, backgroundColor: "#CFE3E9" }}
      />
    );
  }
}

const mapStateToProps = state => {
  const books = Object.keys(state.books.books).map(key => {
    return state.books.books[key];
  });

  const { sorting } = state.books;

  const { user } = state.auth;

  return { sorting, books, user };
};

export default connect(
  mapStateToProps,
  { booksFetch, fetchUser }
)(BookListScreen);
