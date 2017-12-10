import React, { Component } from 'react';
import { ScrollView, Keyboard, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import { bookUpdate, bookCreate } from '../actions';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import BookForm from '../components/BookForm';

class AddBookScreen extends Component {
  static navigatorStyle = {
    navBarHideOnScroll: false
  }

  constructor(props) {
    super(props);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
  }

  state = {
    emailVerified: false
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  onButtonPress() {
    const {
      author, description, email, location, phone, pictureUrl, price, name, title, navigator
    } = this.props;
    const date = new Date().getTime();

    this.props.bookCreate({
      author, date, description, email, location, phone, pictureUrl, price, name, title, navigator
    });
  }

  retryEmail() {
    firebase.auth().currentUser.reload();
    if (firebase.auth().currentUser.emailVerified) {
      this.setState({ emailVerified: true });
    }
  }

  keyboardWillShow() {
    this.props.navigator.toggleTabs({
      to: 'hidden',
      animated: false
    });
  }

  keyboardWillHide() {
    this.props.navigator.toggleTabs({
      to: 'shown',
      animated: false
    });
  }

  renderAddBookScreen() {
    if (firebase.auth().currentUser.emailVerified) {
      return (
          <Card style={{ backgroundColor: '#CFE3E9' }}>
            <BookForm />
            <CardSection>
              <Button
                raised
                buttonStyle={{ backgroundColor: '#2ecc71' }}
                textStyle={{ textAlign: 'center' }}
                backgroundColor='red'
                title={'Lägg upp'}
                onPress={this.onButtonPress.bind(this)}
              />
            </CardSection>
          </Card>
      );
    }

    return (
      <Card style={{ backgroundColor: '#CFE3E9' }}>
        <CardSection>
          <Text>
            För att lägga upp en bok behöver du verifiera din email först. Ett mail har skickats till: {firebase.auth().currentUser.email}
          </Text>
          <TouchableOpacity onPress={() => this.retryEmail()}>
            <Text>Testa igen</Text>
          </TouchableOpacity>
        </CardSection>
      </Card>
    );
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        {this.renderAddBookScreen()}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    author, description, email, location, phone, pictureUrl, price, name, title
  } = state.bookForm;

  return { author, description, email, location, phone, pictureUrl, price, name, title };
};

export default connect(mapStateToProps, {
  bookUpdate, bookCreate
})(AddBookScreen);
