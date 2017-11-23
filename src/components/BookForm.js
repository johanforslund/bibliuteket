import React, { Component } from 'react';
import { View } from 'react-native';
import { FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import ModalSelector from 'react-native-modal-selector';
import { bookUpdate } from '../actions';
import CardSection from './CardSection';
import Card from './Card';
import ImageUploader from '../components/ImageUploader';

class BookForm extends Component {
  render() {
    let index = 0;
    const data = [
      { key: index++, label: 'Norrköping' },
      { key: index++, label: 'Linköping' }
    ];

    return (
      <View>
        <Card style={{ marginBottom: 10 }}>
          <ImageUploader />
          <CardSection>
            <FormInput
              returnKeyType="go"
              autoCapitalize="sentences"
              placeholder="Bokens Titel"
              onSubmitEditing={() => {
                this.refs.Author.focus();
              }}
              value={this.props.title}
              onChangeText={value => this.props.bookUpdate({ prop: 'title', value })}
            />
          </CardSection>
          
          <CardSection>
            <FormInput
              ref='Author'
              autoCapitalize="words"
              returnKeyType="go"
              placeholder="Författare"
              onSubmitEditing={() => {
                this.refs.Price.focus();
              }}
              value={this.props.author}
              onChangeText={value => this.props.bookUpdate({ prop: 'author', value })}
            />

          </CardSection>

          <CardSection style={{ flexDirection: 'row', flex: 2, padding: 0 }}>
            <CardSection style={{ flex: 1, paddingLeft: 30 }}>
              <ModalSelector
                data={data}
                selectTextStyle={{ color: '#c2c3c9' }}
                initValue='Välj ort...'
                backdropPressToClose
                cancelText={'Avbryt'}
                onChange={value => this.props.bookUpdate({ prop: 'location', value: value.label })}
              />
            </CardSection>
            <CardSection style={{ flex: 1 }}>
              <FormInput
                ref='Price'
                returnKeyType="go"
                keyboardType="numeric"
                placeholder="Pris"
                onSubmitEditing={() => {
                  this.refs.Description.focus();
                }}
                value={this.props.price}
                onChangeText={value => this.props.bookUpdate({ prop: 'price', value })}
              />
            </CardSection>
          </CardSection>

          <CardSection style={{ marginBottom: 24 }}>
            <FormInput
              ref='Description'
              returnKeyType="go"
              autoCapitalize="sentences"
              placeholder="Beskrivning"
              numberOfLines={3}
              multiline
              onSubmitEditing={() => {
                this.refs.Name.focus();
              }}
              value={this.props.description}
              onChangeText={value => this.props.bookUpdate({ prop: 'description', value })}
            />
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <FormInput
              ref='Name'
              returnKeyType="go"
              autoCapitalize="words"
              placeholder="Namn"
              onSubmitEditing={() => {
                this.refs.Email.focus();
              }}
              value={this.props.name}
              onChangeText={value => this.props.bookUpdate({ prop: 'name', value })}
            />
          </CardSection>

          <CardSection>
            <FormInput
              ref='Email'
              returnKeyType="go"
              placeholder="Email"
              onSubmitEditing={() => {
                this.refs.Number.focus();
              }}
              value={this.props.email}
              onChangeText={value => this.props.bookUpdate({ prop: 'email', value })}
            />
          </CardSection>

          <CardSection>
            <FormInput
              ref='Number'
              keyboardType="numeric"
              placeholder="Telefonnummer"
              value={this.props.phone}
              onChangeText={value => this.props.bookUpdate({ prop: 'phone', value })}
            />
          </CardSection>
        </Card>

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
