import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import ListImage from './components/ListImage';

class App extends Component {
  render() {
    return (
      <View>
        <Text>Tom mall</Text>
        <ListImage source={{ uri: 'https://image.bokus.com/images2/9789144038698_200x_analys-i-flera-variabler' }} />
      </View>
    );
  }
}

export default App;
