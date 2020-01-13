import React, { PureComponent } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Input, Tooltip, Icon, Button } from "react-native-elements";
import { connect } from "react-redux";
import { bookCreate } from "../actions";
import CardSection from "./CardSection";
import Card from "./Card";
import BookTagList from "./BookTagList";
import ImageUploader from "./ImageUploader";
import { isLoading } from "../selectors/utilSelectors";
import { changeMessengerName, changePhone } from "../actions/SettingsActions";

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

    const { storedBook } = this.props;
    if (storedBook) {
      this.state.author = storedBook.author;
      this.state.title = storedBook.title;
    }
  }

  validate = () => {
    const reg = new RegExp("^[0-9]+$");
    return {
      title: this.state.title.length === 0,
      author: this.state.author.length === 0,
      price: this.state.price.length === 0 || !reg.test(this.state.price),
      imageURL: !this.state.imageURL,
      contact:
        this.state.messengerName.length === 0 && this.state.phone.length === 0
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
    const date = new Date().getTime();

    if (messengerName !== "") this.props.changeMessengerName(messengerName);
    if (phone !== "") this.props.changePhone(phone);

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
    preNameIndex = name.indexOf(".me/");
    if (preNameIndex == -1) return name.trim();
    strippedName = name.substr(preNameIndex + 4).trim();

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
              disabled={this.props.storedBook}
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
                  shouldMarkError("title") ? "Obligatoriskt fält" : ""
                }
                maxLength={40}
                inputStyle={styles.inputStyle}
                onSubmitEditing={() => {
                  this.refs.Phone.focus();
                }}
                value={this.state.messengerName}
                rightIcon={
                  <Tooltip // Kanske behöver ändra yOffset i tooltip.js för rätt pos
                    height={100}
                    backgroundColor="#29749D"
                    popover={
                      <Text style={{ color: "white" }}>
                        Detta hittar du under "profil" på facebook messenger
                        (ex. "fornamn.efternamn.131")
                      </Text>
                    }
                  >
                    <Icon name="info" size={20} color="#373737" />
                  </Tooltip>
                }
                onChangeText={value => {
                  messengerNameStripped = this.stripMessengerName(value);
                  this.setState({ messengerName: messengerNameStripped });
                }}
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
            title={"Lägg upp"}
            loading={this.props.loading}
            onPress={this.onButtonPress.bind(this)}
            disabled={
              errors.title ||
              errors.author ||
              errors.price ||
              errors.imageURL ||
              errors.contact
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

  const { messengerName, phone } = state.settings;

  const loading = isLoading(["BOOK_CREATE"], state);

  return { user, loading, messengerName, phone };
};

export default connect(mapStateToProps, {
  bookCreate,
  changeMessengerName,
  changePhone
})(BookForm);
