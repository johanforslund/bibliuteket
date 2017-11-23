import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { bookUpdate, bookCreate } from '../actions';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import BookForm from '../components/BookForm';

class AddBookScreen extends Component {
  onButtonPress() {
    const {
      author, description, email, location, phone, pictureUrl, price, name, title
    } = this.props;
    const date = new Date().getTime();

    this.props.bookCreate({
      author, date, description, email, location, phone, pictureUrl, price, name, title
    });
  }

  render() {
    return (
      <ScrollView>
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
