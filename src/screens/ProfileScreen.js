import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Card from '../components/Card';

class ProfileView extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
        <Card>
          <Text style={styles.profileTextStyle}>Sign in</Text>
        </Card>
        <Card>
          <Text style={styles.profileTextStyle}>Help</Text>
        </Card>
        <Card>
          <Text style={styles.profileTextStyle}>Contact</Text>
        </Card>

      </View>
    );
  }
}
const styles = {
  profileTextStyle: {
    fontSize: 25,
    alignSelf: 'center',
    }
  };

export default ProfileView;
