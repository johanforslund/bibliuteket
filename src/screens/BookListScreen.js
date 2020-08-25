import React, { Component } from "react";
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator
} from "react-native";
import { Button } from "react-native-elements";

import { connect } from "react-redux";
import firebase from "react-native-firebase"; //eslint-disable-line
import { booksFetch } from "../actions";
import BookDetail from "../components/BookDetail";
import SearchBar from "../components/SearchBar";
import { isLoading } from "../selectors/utilSelectors";
import { BOOKS_FETCH_REQUEST } from "../actions/types";
import { getBooks } from "../selectors/bookSelectors";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

const magnifying_glass = require("../images/bib-magnifying.png");

class BookListScreen extends Component {
  static navigationOptions = {
    header: <SearchBar />
  };

  componentDidMount() {
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
          <Text style={{ textAlign: "center" }}>Laddar böcker...</Text>
          <ActivityIndicator />
        </View>
      );
    }
    return this.props.books.length > 0 ? (
      <KeyboardAwareFlatList
        keyboardShouldPersistTaps={"handled"}
        data={this.props.books}
        renderItem={this.renderBook}
        keyExtractor={this.keyExtractor}
        style={styles.bookList}
      />
    ) : (
      <View style={styles.noBooksStyle}>
        <Image
          source={magnifying_glass}
          style={{
            height: 100,
            width: 100
          }}
        />
        <Text style={{ fontWeight: "bold", marginBottom: 20, marginTop: 20 }}>
          Inga böcker kunde hittas
        </Text>
        <Text>Testa att söka på:</Text>
        <Text>kurskod, titel, författare, program m.m...</Text>

        <Text style={styles.monitorBookTextStyle}>
          Vill du bli notifierad när en bok du söker läggs upp?
        </Text>
        <Button
          onPress={() => this.props.navigation.navigate("MonitorBook")}
          title="Gå till Bevaka bok"
        />
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
  },
  monitorBookTextStyle: {
    marginTop: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
  }
});

const mapStateToProps = state => {
  const books = getBooks(state);

  const { sorting } = state.books;

  const loading = isLoading(["BOOKS_FETCH"], state);

  return { sorting, books, loading };
};

export default connect(
  mapStateToProps,
  { booksFetch }
)(BookListScreen);
