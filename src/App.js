import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Card from './components/Card';

class App extends Component {
  render() {
    return (
      <View style={styles}>
        <Card>
          <Text>Tom mall</Text>
        </Card>
        <Card>
          <Text>Tom mall</Text>
        </Card>
      </View>
    );
  }
}

const styles = {
  backgroundColor: '#CFE3E9',
  flex: 1
};

export default App;
