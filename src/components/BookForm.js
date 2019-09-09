import React, { Component } from "react";

import { View, Text } from "react-native";
import { Input, Tooltip, Icon } from "react-native-elements";

import { connect } from "react-redux";
import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
//import ModalSelector from 'react-native-modal-selector';
import { bookUpdate } from "../actions";
import CardSection from "./CardSection";
import Card from "./Card";
import BookTagList from "./BookTagList";

class BookForm extends Component {
  componentWillMount() {
    this.props.bookUpdate({
      prop: "email",
      value: firebase.auth().currentUser.email
    });
  }

  render() {
    return (
      <View>
        <Card style={{ marginBottom: 10 }}>
          <CardSection>
            <Input
              returnKeyType="next"
              autoCapitalize="sentences"
              placeholder="Bokens Titel"
              maxLength={35}
              onSubmitEditing={() => {
                this.refs.Author.focus();
              }}
              value={this.props.title}
              onChangeText={value =>
                this.props.bookUpdate({ prop: "title", value })
              }
            />
          </CardSection>

          <CardSection>
            <Input
              ref="Author"
              autoCapitalize="words"
              returnKeyType="next"
              placeholder="Författare"
              maxLength={35}
              onSubmitEditing={() => {
                this.refs.Price.focus();
              }}
              value={this.props.author}
              onChangeText={value =>
                this.props.bookUpdate({ prop: "author", value })
              }
            />
          </CardSection>

          <CardSection style={{ flex: 1 }}>
            <Input
              ref="Price"
              returnKeyType="next"
              keyboardType="numeric"
              placeholder="Pris"
              maxLength={4}
              onSubmitEditing={() => {
                this.refs.Description.focus();
              }}
              value={this.props.price}
              onChangeText={value =>
                this.props.bookUpdate({ prop: "price", value })
              }
            />
          </CardSection>

          <CardSection style={{ marginBottom: 24 }}>
            <Input
              ref="Description"
              returnKeyType="next"
              autoCapitalize="sentences"
              placeholder="Beskrivning"
              numberOfLines={3}
              multiline
              onSubmitEditing={() => {
                this.refs.Name.focus();
              }}
              value={this.props.description}
              onChangeText={value =>
                this.props.bookUpdate({ prop: "description", value })
              }
            />
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Input
              ref="Name"
              returnKeyType="next"
              autoCapitalize="words"
              placeholder="Namn"
              editable={false}
              onSubmitEditing={() => {
                this.refs.Messenger.focus();
              }}
              value={this.props.user.displayName}
            />
          </CardSection>

          <CardSection>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Input
                ref="Messenger"
                returnKeyType="next"
                placeholder="Messenger-användarnamn"
                maxLength={40}
                onSubmitEditing={() => {
                  this.refs.Email.focus();
                }}
                value={this.props.messengerName}
                rightIcon={
                  <Tooltip // Kanske behöver ändra yOffset i tooltip.js för rätt pos
                    height={100}
                    popover={
                      <Text>
                        Detta hittar du under "profil" på facebook messenger
                      </Text>
                    }
                  >
                    <Icon name="info" size={20} color="#373737" />
                  </Tooltip>
                }
                onChangeText={value =>
                  this.props.bookUpdate({ prop: "messengerName", value })
                }
              />
            </View>
          </CardSection>

          <CardSection>
            <Input
              ref="Email"
              returnKeyType="next"
              placeholder="Email"
              maxLength={40}
              onSubmitEditing={() => {
                this.refs.Number.focus();
              }}
              value={this.props.email}
              onChangeText={value =>
                this.props.bookUpdate({ prop: "email", value })
              }
            />
          </CardSection>

          <CardSection>
            <Input
              ref="Number"
              keyboardType="numeric"
              placeholder="Telefonnummer (frivilligt)"
              maxLength={15}
              value={this.props.phone}
              onChangeText={value =>
                this.props.bookUpdate({ prop: "phone", value })
              }
            />
          </CardSection>
          <CardSection>
            <BookTagList />
          </CardSection>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    author,
    description,
    email,
    phone,
    pictureUrl,
    price,
    title,
    messengerName
  } = state.bookForm;

  const { user } = state.auth;

  return {
    author,
    description,
    email,
    phone,
    pictureUrl,
    price,
    title,
    user,
    messengerName
  };
};

export default connect(
  mapStateToProps,
  { bookUpdate }
)(BookForm);
