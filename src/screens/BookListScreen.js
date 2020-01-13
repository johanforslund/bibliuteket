import React, { Component } from "react";
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import firebase from "react-native-firebase"; //eslint-disable-line
import { booksFetch } from "../actions";
import BookDetail from "../components/BookDetail";
import SearchBar from "../components/SearchBar";
import { isLoading } from "../selectors/utilSelectors";
import { BOOKS_FETCH_REQUEST } from "../actions/types";
import { getBooks } from "../selectors/bookSelectors";

class BookListScreen extends Component {
  static navigationOptions = {
    header: <SearchBar />
  };

  componentWillMount() {
    this.props.booksFetch();
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
    if (this.props.loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center" }}>Loading books...</Text>
          <ActivityIndicator />
        </View>
      );
    }
    return this.props.books.length > 0 ? (
      <FlatList
        data={this.props.books}
        renderItem={this.renderBook}
        keyExtractor={this.keyExtractor}
        style={styles.bookList}
      />
    ) : (
      <View style={styles.noBooksStyle}>
        <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
          Inga böcker kunde hittas
        </Text>
        <Text>Testa att söka på:</Text>
        <Text>kurskod, titel, författare, program m.m...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bookList: {
    flex: 1,
    backgroundColor: "#CFE3E9"
  },
  noBooksStyle: {
    flex: 1,
    backgroundColor: "#CFE3E9",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "10%"
  }
});

const mapStateToProps = state => {
  const books = getBooks(state);

  const { sorting } = state.books;

  const loading = isLoading(["BOOKS_FETCH"], state);

  return { sorting, books, loading };
};

export default connect(mapStateToProps, { booksFetch })(BookListScreen);
