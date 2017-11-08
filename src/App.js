import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Card from './components/Card';

import ListImage from './components/ListImage';

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <View>
        <Text>Tom mall</Text>
        <ListImage source={{ uri: 'https://image.bokus.com/images2/9789144038698_200x_analys-i-flera-variabler' }} />
=======
      <View style={styles}>
        <Card>
          <Text>Tom mall</Text>
        </Card>
        <Card>
          <Text>Tom mall</Text>
        </Card>
>>>>>>> e461647189ba0a3300f4f19ba7bcacecad398276
      </View>
    );
  }
}

const styles = {
  backgroundColor: '#CFE3E9',
  flex: 1
};

export default App;
