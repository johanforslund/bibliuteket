import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import moment from 'moment';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import { profileBooksFetch } from '../actions';

class ProfileScreen extends Component {
  static navigatorStyle = {
    navBarHideOnScroll: false
  }

  componentWillMount() {
    this.props.profileBooksFetch();
  }

  onLogout() {
    firebase.auth().signOut();
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

  renderProfileBooks() {
    return this.props.profileBooks.map(profileBook =>
      <TouchableOpacity
        key={profileBook.date}
        delayPressIn={50}
        onPress={() => this.handlePress(profileBook)}
      >
        <Card>
          <CardSection>
            <Text>
              {profileBook.title} - ({moment(profileBook.date).format('YYYY-MM-DD | HH:SS')})
            </Text>
          </CardSection>
        </Card>
      </TouchableOpacity>
    );
  }

  authStatus() {
    if (this.props.user.emailVerified) {
      return (
        <Text>Verifierad mail: ja</Text>
      );
    }
    return (
      <Text>Verifierad mail: nej</Text>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
        <Card style={{ alignSelf: 'flex-end', marginBottom: 30 }}>
          <CardSection>
            <Text>*TEMPORÄR INFO*</Text>
            <Text>{this.props.user.displayName}</Text>
            <Text>{this.props.user.email}</Text>
            {this.authStatus()}
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            {this.renderProfileBooks()}
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

const mapStateToProps = (state) => {
  const { profileBooks } = state.profile;
  const { user } = state.auth;

  return { profileBooks, user };
};

export default connect(mapStateToProps, { profileBooksFetch })(ProfileScreen);
