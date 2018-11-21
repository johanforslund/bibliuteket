import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

class AddBookScreen extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
        <Text>Lägg ut bok!</Text>
      </ScrollView>
    );
  }
}

export default AddBookScreen;
