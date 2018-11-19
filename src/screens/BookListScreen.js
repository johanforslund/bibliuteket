import React, { Component } from 'react';
import firebase from '@firebase/app'
import '@firebase/auth'
import { ScrollView, TouchableOpacity, Text } from 'react-native';

class BookListScreen extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
        <Text>Hem</Text>
      </ScrollView>
    );
  }
}

export default BookListScreen;
