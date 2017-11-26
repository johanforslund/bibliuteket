import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { emailChanged, passwordChanged, loginUser, registerUser } from '../actions';
import CardSection from '../components/CardSection';

class LoginScreen extends Component {
  onLoginPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  handleRegisterButtonPress() {
    this.props.navigator.push({
      screen: 'BookListScreen',
      navigatorStyle: {
        tabBarHidden: true
      }
    });
  }

  render() {
    return (
      <View>
        <CardSection style={{ marginTop: 40, marginBottom: 40 }}>
      
        </CardSection>
        <CardSection>
          <View style={styles.searchSection}>
            <Icon color="#a5a5a5" name="person" size={20} style={styles.searchIcon} />
            <FormInput
              containerStyle={styles.input}
              inputStyle={{ marginLeft: 30 }}
              placeholder="LiU-ID"
              value={this.props.email}
              onChangeText={this.onEmailChange.bind(this)}
            />
          </View>
          <View style={styles.searchSection}>
            <Icon color="#a5a5a5" name="lock" size={20} style={styles.searchIcon} />
            <FormInput
              containerStyle={[styles.input, { marginBottom: 20 }]}
              inputStyle={{ marginLeft: 30 }}
              placeholder="Lösenord"
              value={this.props.password}
              onChangeText={this.onPasswordChange.bind(this)}
            />
          </View>
          <Button
            raised
            buttonStyle={{ backgroundColor: '#2ecc71' }}
            textStyle={{ textAlign: 'center' }}
            backgroundColor='red'
            title={'Logga in'}
            onPress={this.onLoginPress.bind(this)}
          />

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </CardSection>
        <CardSection>
          <Text style={{ alignSelf: 'center' }}>Har du inget konto?
            <TouchableWithoutFeedback onPress={this.handleRegisterButtonPress.bind(this)}>
              <Text style={{ color: '#2ecc71' }}> Registrera ditt konto här</Text>
            </TouchableWithoutFeedback>
          </Text>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red'
  },
  searchSection: {
    overflow: 'hidden'
  },
  searchIcon: {
    position: 'absolute',
    paddingLeft: 20,
    paddingTop: 7
  },
  input: {
    overflow: 'hidden',
  }
};


const mapStateToProps = (state) => {
  const { email, password, error, loading } = state.auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, registerUser
})(LoginScreen);
