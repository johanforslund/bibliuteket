import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { userUpdate, registerUser } from '../actions';

class LoginScreen extends Component {
  onRegisterPress() {
    const { name, email, password } = this.props;
    this.props.registerUser({ name, email, password });
  }

  render() {
    return (
      <View>
        <FormInput
          placeholder="Namn"
          value={this.props.name}
          onChangeText={value => this.props.userUpdate({ prop: 'name', value })}
        />
        <FormInput
          placeholder="Email"
          value={this.props.email}
          onChangeText={value => this.props.userUpdate({ prop: 'email', value })}
        />
        <FormInput
          placeholder="Lösenord"
          value={this.props.password}
          autoCorrect={false}
          secureTextEntry
          onChangeText={value => this.props.userUpdate({ prop: 'password', value })}
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
  const { name, email, password, error, loading } = state.auth;

  return { name, email, password, error, loading };
};

export default connect(mapStateToProps, {
  userUpdate, registerUser
})(LoginScreen);
