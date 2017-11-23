import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, registerUser } from '../actions';

class LoginScreen extends Component {
  onLoginPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  onRegisterPress() {
    const { email, password } = this.props;
    this.props.registerUser({ email, password });
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  render() {
    return (
      <View>
        <FormInput
          placeholder="Email"
          value={this.props.email}
          onChangeText={this.onEmailChange.bind(this)}
        />
        <FormInput
          placeholder="Lösenord"
          value={this.props.password}
          onChangeText={this.onPasswordChange.bind(this)}
        />
        <Button
          raised
          buttonStyle={{ backgroundColor: '#2ecc71' }}
          textStyle={{ textAlign: 'center' }}
          backgroundColor='red'
          title={'Logga in'}
          onPress={this.onLoginPress.bind(this)}
        />

        <FormInput
          placeholder="Email"
          value={this.props.email}
          onChangeText={this.onEmailChange.bind(this)}
        />
        <FormInput
          placeholder="Lösenord"
          value={this.props.password}
          onChangeText={this.onPasswordChange.bind(this)}
        />
        <Button
          raised
          buttonStyle={{ backgroundColor: '#2ecc71' }}
          textStyle={{ textAlign: 'center' }}
          backgroundColor='red'
          title={'Registrera'}
          onPress={this.onRegisterPress.bind(this)}
        />

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = (state) => {
  const { email, password, error, loading } = state.auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, registerUser
})(LoginScreen);
