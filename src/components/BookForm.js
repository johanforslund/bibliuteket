import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { bookUpdate } from '../actions';
import CardSection from './CardSection';
import ImageUploader from '../components/ImageUploader';

class BookForm extends Component {
  render() {
    return (
      <View>
        <ImageUploader />
        <CardSection>
          <FormLabel>Författare</FormLabel>
          <FormInput
            placeholder="Författare"
            value={this.props.author}
            onChangeText={value => this.props.bookUpdate({ prop: 'author', value })}
          />
        </CardSection>

        <CardSection>
          <FormLabel>Beskrivning</FormLabel>
          <FormInput
            placeholder="Beskrivning"
            value={this.props.description}
            onChangeText={value => this.props.bookUpdate({ prop: 'description', value })}
          />
        </CardSection>

        <CardSection>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder="Email"
            value={this.props.email}
            onChangeText={value => this.props.bookUpdate({ prop: 'email', value })}
          />
        </CardSection>

        <CardSection>
          <FormLabel>Ort</FormLabel>
          <FormInput
            placeholder="Ort"
            value={this.props.location}
            onChangeText={value => this.props.bookUpdate({ prop: 'location', value })}
          />
        </CardSection>

        <CardSection>
          <FormLabel>Namn</FormLabel>
          <FormInput
            placeholder="Namn"
            value={this.props.name}
            onChangeText={value => this.props.bookUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <FormLabel>Telefonnummer</FormLabel>
          <FormInput
            placeholder="Telefonnummer"
            value={this.props.phone}
            onChangeText={value => this.props.bookUpdate({ prop: 'phone', value })}
          />
        </CardSection>

        <CardSection>
          <FormLabel>Pris</FormLabel>
          <FormInput
            placeholder="Pris"
            value={this.props.price}
            onChangeText={value => this.props.bookUpdate({ prop: 'price', value })}
          />
        </CardSection>

        <CardSection>
          <FormLabel>Bokens Titel</FormLabel>
          <FormInput
            placeholder="Bokens Titel"
            value={this.props.title}
            onChangeText={value => this.props.bookUpdate({ prop: 'title', value })}
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    author, description, email, location, phone, pictureUrl, price, name, title
  } = state.bookForm;

  return { author, description, email, location, phone, pictureUrl, price, name, title };
};

export default connect(mapStateToProps, { bookUpdate })(BookForm);
