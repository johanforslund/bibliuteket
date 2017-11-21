import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { View } from 'react-native';

class ProfileScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
        <List>
          <ListItem
            title='Kontakt'
            leftIcon={{ name: 'mail' }}
          />
          <ListItem
            title='Hjälp'
            leftIcon={{ name: 'help' }}
          />
          <ListItem
            title='Logga ut'
            leftIcon={{ name: 'log-out', type: 'entypo' }}
          />
        </List>
      </View>
    );
  }
}

export default ProfileScreen;
