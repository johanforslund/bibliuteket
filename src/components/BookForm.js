import React, { PureComponent } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Input, Tooltip, Icon, Button } from "react-native-elements";
import { connect } from "react-redux";
import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
import "@firebase/database";
import { bookCreate } from "../actions";
import CardSection from "./CardSection";
import Card from "./Card";
import BookTagList from "./BookTagList";
import ImageUploader from "./ImageUploader";

class BookForm extends PureComponent {
  state = {
    author: "",
    description: "",
    email: "",
    location: "",
    phone: "",
    price: "",
    name: "",
    title: "",
    imageURL: null,
    messengerName: "",
    hasPhone: false,
    hasMessengerName: false,
    touched: {
      title: false,
      author: false,
      price: false
    },
    tags: []
  };

  componentWillMount() {
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .once("value")
      .then(snapshot => {
        phone = (snapshot.val() && snapshot.val().phone) || "";
        messengerName = (snapshot.val() && snapshot.val().messengerName) || "";
        this.setState({
          email: firebase.auth().currentUser.email,
          phone,
          messengerName,
          hasPhone: phone !== "",
          hasMessengerName: messengerName !== ""
        });
      });
  }

  validate = () => {
    const reg = new RegExp("^[0-9]+$");
    return {
      title: this.state.title.length === 0,
      author: this.state.author.length === 0,
      price: this.state.price.length === 0 || !reg.test(this.state.price),
      imageURL: !this.state.imageURL
    };
  };

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
      imageURL,
      messengerName,
      tags
    } = this.state;
    const date = new Date().getTime();

    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .set({
        phone,
        messengerName
      });

    this.setState({
      hasPhone: phone !== "",
      hasMessengerName: messengerName !== ""
    });

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
      imageURL,
      messengerName,
      tags
    });
  }

  setImageURL = url => {
    this.setState({ imageURL: url });
  };

  setTag = tag => {
    this.setState({ tags: [...this.state.tags, tag] });
  };

  render() {
    const errors = this.validate();
    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
      <ScrollView
        style={{ backgroundColor: "#CFE3E9" }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={{ marginBottom: 0 }}>
          <CardSection>
            <ImageUploader
              setImageURL={this.setImageURL}
              imageURL={this.state.imageURL}
            />
          </CardSection>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <CardSection>
            <Input
              returnKeyType="next"
              autoCapitalize="sentences"
              label="Bokens Titel"
              errorMessage={
                shouldMarkError("title") ? "Obligatoriskt fält" : ""
              }
              inputStyle={styles.inputStyle}
              maxLength={35}
              onSubmitEditing={() => {
                this.refs.Author.focus();
              }}
              value={this.state.title}
              onChangeText={value => this.setState({ title: value })}
              onBlur={() =>
                this.setState({
                  touched: { ...this.state.touched, title: true }
                })
              }
            />
          </CardSection>

          <CardSection>
            <Input
              ref="Author"
              autoCapitalize="words"
              returnKeyType="next"
              label="Författare"
              errorMessage={
                shouldMarkError("author") ? "Obligatoriskt fält" : ""
              }
              inputStyle={styles.inputStyle}
              maxLength={35}
              onSubmitEditing={() => {
                this.refs.Price.focus();
              }}
              value={this.state.author}
              onChangeText={value => this.setState({ author: value })}
              onBlur={() =>
                this.setState({
                  touched: { ...this.state.touched, author: true }
                })
              }
            />
          </CardSection>

          <CardSection>
            <Input
              ref="Price"
              returnKeyType="next"
              keyboardType="numeric"
              label="Pris"
              errorMessage={shouldMarkError("price") ? "Felaktigt pris" : ""}
              inputStyle={styles.inputStyle}
              maxLength={4}
              onSubmitEditing={() => {
                this.refs.Description.focus();
              }}
              value={this.state.price}
              onChangeText={value => this.setState({ price: value })}
              onBlur={() =>
                this.setState({
                  touched: { ...this.state.touched, price: true }
                })
              }
            />
          </CardSection>

          <CardSection style={{ marginBottom: 24 }}>
            <Input
              ref="Description"
              returnKeyType="next"
              autoCapitalize="sentences"
              label="Beskrivning"
              inputStyle={styles.inputStyle}
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
          {!this.state.hasMessengerName && (
            <CardSection>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Input
                  ref="Messenger"
                  returnKeyType="next"
                  label="Messenger-användarnamn"
                  maxLength={40}
                  inputStyle={styles.inputStyle}
                  onSubmitEditing={() => {
                    this.refs.Email.focus();
                  }}
                  value={this.state.messengerName}
                  rightIcon={
                    <Tooltip // Kanske behöver ändra yOffset i tooltip.js för rätt pos
                      height={100}
                      backgroundColor="#29749D"
                      popover={
                        <Text style={{ color: "white" }}>
                          Detta hittar du under "profil" på facebook messenger
                        </Text>
                      }
                    >
                      <Icon name="info" size={20} color="#373737" />
                    </Tooltip>
                  }
                  onChangeText={value =>
                    this.setState({ messengerName: value })
                  }
                />
              </View>
            </CardSection>
          )}
          {!this.state.hasPhone && (
            <CardSection>
              <Input
                ref="Number"
                keyboardType="numeric"
                label="Telefonnummer"
                maxLength={15}
                inputStyle={styles.inputStyle}
                value={this.state.phone}
                onChangeText={value => this.setState({ phone: value })}
              />
            </CardSection>
          )}
          <CardSection>
            <BookTagList setTag={this.setTag} tags={this.state.tags} />
          </CardSection>
        </Card>
        <CardSection style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button
            raised
            buttonStyle={{ backgroundColor: "#2ecc71" }}
            textStyle={{ textAlign: "center" }}
            title={"Lägg upp"}
            onPress={this.onButtonPress.bind(this)}
            disabled={
              errors.title || errors.author || errors.price || errors.imageURL
            }
          />
        </CardSection>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: { paddingVertical: 0 }
});

const mapStateToProps = state => {
  const { user } = state.auth;

  return { user };
};

export default connect(
  mapStateToProps,
  { bookCreate }
)(BookForm);
