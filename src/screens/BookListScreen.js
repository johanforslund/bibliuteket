import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native';
import { booksFetch } from '../actions';
import BookDetail from '../components/BookDetail';

class BookList extends Component {
  componentWillMount() {
    this.props.booksFetch();
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
        key={book.pictureUrl}
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

  return { books };
};

export default connect(mapStateToProps, { booksFetch })(BookList);
