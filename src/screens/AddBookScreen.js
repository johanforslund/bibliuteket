import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Card from '../components/Card';

class BookList extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
        <Card>
          <Text>Temporär screen</Text>
        </Card>
      </View>
    );
  }
}

export default BookList;
