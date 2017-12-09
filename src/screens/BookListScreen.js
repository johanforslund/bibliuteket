import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { ScrollView, TouchableOpacity } from 'react-native';
import { booksFetch, fetchUser } from '../actions';
import BookDetail from '../components/BookDetail';

class BookListScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setStyle({
      navBarCustomView: 'SearchBar',
      navBarCustomViewInitialProps: {
        store: this.props.store
      }
    });
  }

  componentWillMount() {
    this.props.booksFetch();
    if (this.props.user.displayName === undefined) {
      this.props.fetchUser(firebase.auth().currentUser);
    }
  }

  handlePress = (book) => {
    this.props.navigator.push({
      screen: 'BookScreen',
      passProps: { book },
      navigatorStyle: {
        tabBarHidden: true
      }
    });
  }

  renderBooks() {
    return this.props.books.map(book =>
      <TouchableOpacity
        key={book.date}
        delayPressIn={50}
        onPress={() => this.handlePress(book)}
      >
        <BookDetail book={book} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
        {this.renderBooks()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const books = Object.keys(state.books).map((key) => {
    return state.books[key];
  });

  const { user } = state.auth;

  return { books, user };
};

export default connect(mapStateToProps, { booksFetch, fetchUser })(BookListScreen);
