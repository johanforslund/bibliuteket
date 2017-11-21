import React, { Component } from 'react';
import { View, Picker } from 'react-native';
import { FormInput } from 'react-native-elements';
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
          <FormInput
            placeholder="Bokens Titel"
            value={this.props.title}
            onChangeText={value => this.props.bookUpdate({ prop: 'title', value })}
          />
        </CardSection>

        <CardSection>
          <FormInput
            placeholder="Författare"
            value={this.props.author}
            onChangeText={value => this.props.bookUpdate({ prop: 'author', value })}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'row', flex: 2, padding: 0 }}>
          <CardSection style={{ flex: 1, paddingLeft: 21 }}>
            <Picker
              style={{ width: 120, color: '#a4a5a5' }}
              selectedValue={this.props.location}
              onValueChange={value => this.props.bookUpdate({ prop: 'location', value })}
            >
              <Picker.Item label="Norrköping" value="Norrköping" />
              <Picker.Item label="Linköping" value="Linköping" />
            </Picker>
          </CardSection>

          <CardSection style={{ flex: 1 }}>
            <FormInput
              placeholder="Pris"
              value={this.props.price}
              onChangeText={value => this.props.bookUpdate({ prop: 'price', value })}
            />
          </CardSection>
        </CardSection>

        <CardSection>
          <FormInput
            placeholder="Beskrivning"
            value={this.props.description}
            onChangeText={value => this.props.bookUpdate({ prop: 'description', value })}
          />
        </CardSection>

        <CardSection>
          <FormInput
            placeholder="Namn"
            value={this.props.name}
            onChangeText={value => this.props.bookUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <FormInput
            placeholder="Email"
            value={this.props.email}
            onChangeText={value => this.props.bookUpdate({ prop: 'email', value })}
          />
        </CardSection>

        <CardSection>
          <FormInput
            placeholder="Telefonnummer"
            value={this.props.phone}
            onChangeText={value => this.props.bookUpdate({ prop: 'phone', value })}
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
