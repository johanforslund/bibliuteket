import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Input, Tooltip, Icon, Button } from "react-native-elements";
import { connect } from "react-redux";
import { bookCreate, bookEdit } from "../actions";
import CardSection from "./CardSection";
import Card from "./Card";
import BookTagList from "./BookTagList";
import ImageUploader from "./ImageUploader";
import { isLoading } from "../selectors/utilSelectors";
import { changeMessengerName, changePhone } from "../actions/SettingsActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const msg_username = require("../images/user_name.jpg");
const msg_profile = require("../images/profile_fb.jpg");

class BookForm extends PureComponent {
  state = {
    author: "",
    description: "",
    location: "",
    phone: this.props.phone,
    price: "",
    name: "",
    title: "",
    imageURL: null,
    messengerName: this.props.messengerName,
    touched: {
      title: false,
      author: false,
      price: false,
      messengerName: false,
      phone: false
    },
    tags: []
  };

  constructor(props) {
    super(props);

    const { storedBook, editBook } = this.props;
    if (editBook) {
      this.state.author = editBook.author;
      this.state.title = editBook.title;
      this.state.description = editBook.description;
      this.state.location = editBook.location;
      this.state.phone = editBook.phone;
      this.state.price = editBook.price.toString();
      this.state.name = editBook.name;
      this.state.imageURL = editBook.imageURL;
      this.state.messengerName = editBook.messengerName;
      this.state.tags = editBook.tags ? editBook.tags : [];
    } else if (storedBook) {
      this.state.author = storedBook.author;
      this.state.title = storedBook.title;
    }
  }

  validate = () => {
    const { title, author, price, messengerName, phone } = this.state;

    const regNumber = new RegExp("^[0-9]+$");
    const regMessengerName = new RegExp("^[a-zA-Z0-9.]+$");
    return {
      title: title.length === 0,
      author: author.length === 0,
      price: price.length === 0 || !regNumber.test(price),
      imageURL: !this.state.imageURL,
      messengerName: messengerName && !regMessengerName.test(messengerName),
      phone: phone && !regNumber.test(phone),
      contact: messengerName.length === 0 && phone.length === 0
    };
  };

  onButtonPress() {
    const {
      author,
      description,
      location,
      phone,
      price,
      name,
      title,
      imageURL,
      messengerName,
      tags
    } = this.state;

    if (messengerName !== "") this.props.changeMessengerName(messengerName);
    if (phone !== "") this.props.changePhone(phone);

    const { editBook } = this.props;
    if (editBook) {
      this.props.bookEdit(editBook.uid, {
        author,
        description,
        location,
        phone,
        price,
        title,
        imageURL,
        messengerName,
        tags
      });
    } else {
      let programs = [];
      let courses = [];
      let isbn = "";
      let storedBookID = "-1";

      const { storedBook } = this.props;
      if (storedBook) {
        programs = storedBook.program;
        courses = storedBook.course;
        isbn = storedBook.isbn;
        storedBookID = storedBook.objectID;
      }
      const date = new Date().getTime();

      this.props.bookCreate({
        author,
        date,
        description,
        location,
        phone,
        price,
        name,
        title,
        imageURL,
        messengerName,
        tags,
        programs,
        courses,
        isbn,
        storedBookID
      });
    }

    this.setState({
      author: "",
      description: "",
      location: "",
      price: "",
      name: "",
      title: "",
      imageURL: null,
      touched: {
        title: false,
        author: false,
        price: false,
        messengerName: false,
        phone: false
      },
      tags: []
    });
  }

  setImageURL = url => {
    this.setState({ imageURL: url });
  };

  setTag = tag => {
    this.setState({ tags: [...this.state.tags, tag] });
  };

  removeTag = tagIndex => {
    this.setState({
      tags: this.state.tags.filter((tag, index) => tagIndex !== index)
    });
  };

  stripMessengerName = name => {
    const preNameIndexMe = name.indexOf(".me/");
    const preNameIndexFb = name.indexOf(".com/");
    let strippedName;
    if (preNameIndexMe == -1 && preNameIndexFb == -1) return name.trim();
    if (preNameIndexMe > 0) {
      strippedName = name.substr(preNameIndexMe + 4).trim();
    } else {
      strippedName = name.substr(preNameIndexFb + 5).trim();
    }

    return strippedName;
  };

  render() {
    const errors = this.validate();
    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
      <KeyboardAwareScrollView
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
              label="Bokens Titel*"
              errorMessage={
                shouldMarkError("title") ? "Obligatoriskt fält" : ""
              }
              inputStyle={styles.inputStyle}
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
              label="Författare*"
              errorMessage={
                shouldMarkError("author") ? "Obligatoriskt fält" : ""
              }
              inputStyle={styles.inputStyle}
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
              disabled={
                this.props.storedBook ||
                (this.props.editBook &&
                  this.props.editBook.storedBookID !== "-1")
              }
            />
          </CardSection>

          <CardSection>
            <Input
              ref="Price"
              returnKeyType="next"
              keyboardType="numeric"
              label="Pris*"
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
          <CardSection>
            <BookTagList
              removeTag={this.removeTag}
              setTag={this.setTag}
              tags={this.state.tags}
            />
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Text style={{ left: 8, color: "#AAAAAA" }}>
              Fyll i minst ett utav följande fält.
            </Text>
          </CardSection>
          <CardSection>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Input
                ref="Messenger"
                returnKeyType="next"
                label="Messenger-användarnamn"
                errorMessage={
                  shouldMarkError("messengerName") ? "Felaktigt format" : ""
                }
                maxLength={70}
                inputStyle={styles.inputStyle}
                onSubmitEditing={() => {
                  this.refs.Phone.focus();
                }}
                value={this.state.messengerName}
                rightIcon={
                  <Tooltip
                    height={300}
                    width={300}
                    backgroundColor="#29749D"
                    popover={
                      <View
                        style={{
                          height: "100%",
                          width: "100%",
                          display: "flex",
                          flexDirection: "row"
                        }}
                      >
                        <Image
                          source={msg_profile}
                          style={{
                            height: "100%",
                            width: "49%",
                            marginRight: "1%"
                          }}
                        />
                        <Image
                          source={msg_username}
                          style={{
                            height: "100%",
                            width: "49%",
                            marginLeft: "1%"
                          }}
                        />
                      </View>
                    }
                  >
                    <Icon name="info" size={20} color="#373737" />
                  </Tooltip>
                }
                onChangeText={value => {
                  const messengerNameStripped = this.stripMessengerName(value);
                  this.setState({ messengerName: messengerNameStripped });
                }}
                onBlur={() =>
                  this.setState({
                    touched: { ...this.state.touched, messengerName: true }
                  })
                }
              />
            </View>
          </CardSection>
          <CardSection>
            <Input
              ref="Phone"
              keyboardType="numeric"
              label="Telefonnummer"
              maxLength={15}
              inputStyle={styles.inputStyle}
              value={this.state.phone}
              onChangeText={value => this.setState({ phone: value })}
            />
          </CardSection>
        </Card>
        <CardSection style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button
            raised
            buttonStyle={{ backgroundColor: "#2ecc71" }}
            textStyle={{ textAlign: "center" }}
            title={this.props.editBook ? "Slutför ändringar" : "Lägg upp"}
            loading={this.props.loading}
            onPress={this.onButtonPress.bind(this)}
            disabled={
              errors.title ||
              errors.author ||
              errors.price ||
              errors.imageURL ||
              errors.messengerName ||
              errors.phone ||
              errors.contact
            }
          />
        </CardSection>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: { paddingVertical: 0 }
});

const mapStateToProps = state => {
  const { user } = state.auth;

  const { messengerName, phone } = state.settings;

  const loading = isLoading(["BOOK_CREATE"], state);

  return { user, loading, messengerName, phone };
};

export default connect(
  mapStateToProps,
  {
    bookCreate,
    bookEdit,
    changeMessengerName,
    changePhone
  }
)(BookForm);
