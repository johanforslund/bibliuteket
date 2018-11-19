import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { booksFetch } from '../actions';

class BookListScreen extends Component {
  componentWillMount() {
    this.props.booksFetch();
  }

  render() {
    console.log(this.props.books);

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
        <Text>Hem</Text>
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

export default connect(mapStateToProps, { booksFetch })(BookListScreen);
