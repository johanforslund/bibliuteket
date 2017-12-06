import React, { Component } from 'react';
import { ScrollView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
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

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
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
