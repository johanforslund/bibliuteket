import React, { Component } from "react";
import { View, Text } from "react-native";
import { Input, Tooltip, Icon, Button } from "react-native-elements";
import { connect } from "react-redux";
import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
import { bookUpdate, bookCreate } from "../actions";
import CardSection from "./CardSection";
import Card from "./Card";
import BookTagList from "./BookTagList";
import ImageUploader from "./ImageUploader";

class BookForm extends Component {
  state = {
    author: "",
    description: "",
    email: firebase.auth().currentUser.email,
    location: "",
    phone: "",
    price: "",
    name: "",
    title: "",
    imageURL: null,
    messengerName: ""
  };

  componentWillMount() {
    this.setState({ email: firebase.auth().currentUser.email });
  }

  onButtonPress() {
    const {
      author,
      description,
      email,
      location,
      phone,
      price,
      name,
      title,
      imageURL
    } = this.state;
    const date = new Date().getTime();

    this.props.bookCreate({
      author,
      date,
      description,
      email,
      location,
      phone,
      price,
      name,
      title,
      imageURL
    });
  }

  setImageURL = url => {
    this.setState({ imageURL: url });
  };

  render() {
    return (
      <View>
        <ImageUploader
          setImageURL={this.setImageURL}
          imageURL={this.state.imageURL}
        />
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
              value={this.state.title}
              onChangeText={value => this.setState({ title: value })}
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
              value={this.state.author}
              onChangeText={value => this.setState({ author: value })}
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
              value={this.state.price}
              onChangeText={value => this.setState({ price: value })}
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
              value={this.state.description}
              onChangeText={value => this.setState({ description: value })}
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
                value={this.state.messengerName}
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
                onChangeText={value => this.setState({ messengerName: value })}
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
              value={this.state.email}
              onChangeText={value => this.setState({ email: value })}
            />
          </CardSection>

          <CardSection>
            <Input
              ref="Number"
              keyboardType="numeric"
              placeholder="Telefonnummer (frivilligt)"
              maxLength={15}
              value={this.state.phone}
              onChangeText={value => this.setState({ phone: value })}
            />
          </CardSection>
          <CardSection>
            <BookTagList />
          </CardSection>
        </Card>
        <CardSection>
          <Button
            raised
            buttonStyle={{ backgroundColor: "#2ecc71" }}
            textStyle={{ textAlign: "center" }}
            backgroundColor="red"
            title={"Lägg upp"}
            onPress={this.onButtonPress.bind(this)}
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;

  return { user };
};

export default connect(
  mapStateToProps,
  { bookUpdate, bookCreate }
)(BookForm);
