import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bookUpdate } from '../actions';
import CardSection from './CardSection';

class BookForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <TextInput
            placeholder="Författare"
            value={this.props.author}
            onChangeText={value => this.props.bookUpdate({ prop: 'author', value })}
          />
        </CardSection>

        <CardSection>
          <TextInput
            placeholder="Datum"
            value={this.props.date}
            onChangeText={value => this.props.bookUpdate({ prop: 'date', value })}
          />
        </CardSection>

        <CardSection>
          <TextInput
            placeholder="Beskrivning"
            value={this.props.description}
            onChangeText={value => this.props.bookUpdate({ prop: 'description', value })}
          />
        </CardSection>

        <CardSection>
          <TextInput
            placeholder="Email"
            value={this.props.email}
            onChangeText={value => this.props.bookUpdate({ prop: 'email', value })}
          />
        </CardSection>

        <CardSection>
          <TextInput
            placeholder="Ort"
            value={this.props.location}
            onChangeText={value => this.props.bookUpdate({ prop: 'location', value })}
          />
        </CardSection>

        <CardSection>
          <TextInput
            placeholder="Namn"
            value={this.props.name}
            onChangeText={value => this.props.bookUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <TextInput
            placeholder="Telefonnummer"
            value={this.props.phone}
            onChangeText={value => this.props.bookUpdate({ prop: 'phone', value })}
          />
        </CardSection>

        <CardSection>
          <TextInput
            placeholder="Bild URL"
            value={this.props.pictureUrl}
            onChangeText={value => this.props.bookUpdate({ prop: 'pictureUrl', value })}
          />
        </CardSection>

        <CardSection>
          <TextInput
            placeholder="Pris"
            value={this.props.price}
            onChangeText={value => this.props.bookUpdate({ prop: 'price', value })}
          />
        </CardSection>

        <CardSection>
          <TextInput
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
    author, date, description, email, location, phone, pictureUrl, price, name, title
  } = state.bookForm;

  return { author, date, description, email, location, phone, pictureUrl, price, name, title };
};

export default connect(mapStateToProps, { bookUpdate })(BookForm);
