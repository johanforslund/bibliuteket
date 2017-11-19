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
      author, date, description, email, location, phone, pictureUrl, price, name, title
    } = this.props;

    this.props.bookCreate({
      author, date, description, email, location, phone, pictureUrl, price, name, title
    });
  }

  render() {
    return (
      <ScrollView>
        <Card>
          <BookForm {...this.props} />
          <CardSection>
            <Button
              raised
              buttonStyle={{ backgroundColor: '#2ecc71', borderRadius: 10 }}
              textStyle={{ textAlign: 'center' }}
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
    author, date, description, email, location, phone, pictureUrl, price, name, title
  } = state.bookForm;

  return { author, date, description, email, location, phone, pictureUrl, price, name, title };
};

export default connect(mapStateToProps, {
  bookUpdate, bookCreate
})(AddBookScreen);
