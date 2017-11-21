import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import Card from '../components/Card';
import CardSection from '../components/CardSection';

class ProfileScreen extends Component {
  onLogout() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
        <Card>
          <CardSection>
            <Text>{firebase.auth().currentUser.email}</Text>
          </CardSection>
        </Card>
        <List>
          <ListItem
            title='Kontakt'
            leftIcon={{ name: 'mail' }}
          />
          <ListItem
            title='Hjälp'
            leftIcon={{ name: 'help' }}
          />
          <TouchableOpacity onPress={this.onLogout}>
            <ListItem
              title='Logga ut'
              leftIcon={{ name: 'log-out', type: 'entypo' }}
            />
          </TouchableOpacity>
        </List>
      </View>
    );
  }
}

export default ProfileScreen;
