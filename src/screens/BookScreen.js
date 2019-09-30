import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Platform
} from "react-native";
import Toast from "react-native-root-toast";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import firebase from "react-native-firebase"; //eslint-disable-line
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import BookTag from "../components/BookTag";
import { bookDelete } from "../actions";
import NavigationService from "../navigation/NavigationService";
import { isLoading } from "../selectors/utilSelectors";

const messengerLogo = require("../images/messenger_logo.png");

class BookScreen extends Component {
  state = {
    isModalVisible: false,
    emailVerified: false,
    intervalId: -1
  };

  componentDidMount() {
    if (
      firebase.auth().currentUser &&
      !firebase.auth().currentUser.emailVerified
    ) {
      this.setState({ intervalId: setInterval(this.retryEmail, 10000) });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  retryEmail = () => {
    firebase
      .auth()
      .currentUser.reload()
      .then(() => {
        if (firebase.auth().currentUser.emailVerified) {
          this.setState({ emailVerified: true });
          clearInterval(this.state.intervalId);
        }
      });
  };

  sendSMS = (phone, title) => {
    if (Platform === "ios") {
      Linking.openURL(
        "sms:" +
          phone +
          "&body=" +
          "Hej! Jag är intresserad av att köpa " +
          title +
          "."
      ).catch(error => console.log(error));
    } else {
      Linking.openURL(
        "sms:" +
          phone +
          "?body=" +
          "Hej! Jag är intresserad av att köpa " +
          title +
          "."
      ).catch(error => console.log(error));
    }
  };

  renderDeleteButton() {
    const { currentUser } = firebase.auth();
    const { uid, user, imageURL } = this.props.navigation.getParam("book");
    if (currentUser && currentUser.uid === user) {
      return (
        <View>
          <Button
            raised
            buttonStyle={{ backgroundColor: "#F44336" }}
            textStyle={{ textAlign: "center" }}
            title={"Ta bort"}
            loading={this.props.loading}
            onPress={() => {
              this.setState({
                isModalVisible: !this.state.isModalVisible
              });
            }}
          />
          <Modal
            useNativeDriver={true}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            isVisible={this.state.isModalVisible}
            onBackdropPress={() =>
              this.setState({
                isModalVisible: !this.state.isModalVisible
              })
            }
          >
            <View style={styles.modalContainerStyle}>
              <Text style={styles.titleStyle}>Välj:</Text>
              <Button
                title="Boken är såld"
                onPress={() => {
                  this.props.bookDelete(uid, imageURL, "sell");
                  NavigationService.navigate("BookList");
                  Toast.show("Din bok är markerad som såld!");
                }}
                buttonStyle={{ marginBottom: 15 }}
              />
              <Button
                title="Ta bort annons"
                onPress={() => {
                  this.props.bookDelete(uid, imageURL, "delete");
                  NavigationService.navigate("BookList");
                  Toast.show("Din bok har tagits bort.");
                }}
              />
              <Button
                title="Avbryt"
                onPress={() =>
                  this.setState({
                    isModalVisible: !this.state.isModalVisible
                  })
                }
                type="clear"
              />
            </View>
          </Modal>
        </View>
      );
    }
  }

  renderDescription() {
    const { description } = this.props.navigation.getParam("book");

    if (description.trim() != "") {
      return (
        <Card>
          <CardSection>
            <Text style={styles.descriptionHeadingStyle}>Beskrivning</Text>
            <Text style={styles.descriptionTextStyle}>{description}</Text>
          </CardSection>
        </Card>
      );
    }
  }

  renderMessengerButton() {
    const { messengerName, name, user } = this.props.navigation.getParam(
      "book"
    );
    const { currentUser } = firebase.auth();

    if (!currentUser || (currentUser && currentUser.uid !== user)) {
      if (messengerName.trim() != "") {
        return (
          <TouchableOpacity
            style={styles.messengerStyle}
            onPress={() => {
              if (
                firebase.auth().currentUser &&
                firebase.auth().currentUser.emailVerified
              ) {
                Linking.openURL("https://m.me/" + messengerName);
              } else if (firebase.auth().currentUser) {
                this.retryEmail();
                if (firebase.auth().currentUser.emailVerified) {
                  Linking.openURL("https://m.me/" + messengerName);
                } else Toast.show("Du måste vara verifierad för detta");
              } else {
                this.props.navigation.navigate("Login");
              }
            }}
          >
            <Image
              source={messengerLogo}
              style={{
                marginRight: 8,
                height: 20,
                width: 20
              }}
            />
            <Text style={styles.infoStyle}>Kontakta {name.split(" ")[0]}</Text>
          </TouchableOpacity>
        );
      }
    }
  }

  renderPhoneButton() {
    const { phone, name, title, user } = this.props.navigation.getParam("book");
    const { currentUser } = firebase.auth();

    if (!currentUser || (currentUser && currentUser.uid !== user)) {
      if (phone.trim() != "") {
        return (
          <TouchableOpacity
            style={styles.messengerStyle}
            onPress={() => {
              if (
                firebase.auth().currentUser &&
                firebase.auth().currentUser.emailVerified
              ) {
                this.sendSMS(phone, title);
              } else if (firebase.auth().currentUser) {
                this.retryEmail();
                if (firebase.auth().currentUser.emailVerified) {
                  this.sendSMS(phone, title);
                } else Toast.show("Du måste vara verifierad för detta");
              } else {
                this.props.navigation.navigate("Login");
              }
            }}
          >
            <Icon
              name="phone"
              size={20}
              color="#373737"
              style={styles.iconStyle}
            />
            <Text style={styles.infoStyle}>Sms:a {name.split(" ")[0]}</Text>
          </TouchableOpacity>
        );
      }
    }
  }

  render() {
    const {
      author,
      date,
      name,
      imageURL,
      price,
      title
    } = this.props.navigation.getParam("book");
    const formattedDate = moment(date).fromNow();

    return (
      <ScrollView style={{ backgroundColor: "#CFE3E9" }}>
        <Card>
          <Image style={styles.imageStyle} source={{ uri: imageURL }} />
          <CardSection>
            <Text style={styles.headingStyle}>{title}</Text>
            <Text style={styles.subHeadingStyle}>{author}</Text>
          </CardSection>
          <CardSection style={styles.rowCardStyle}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="location-on"
                size={20}
                color="#373737"
                style={[styles.iconStyle, { marginTop: 5 }]}
              />
              <Text style={[styles.subHeadingStyle, { alignSelf: "center" }]}>
                Norrköping
              </Text>
            </View>
            <Text style={styles.priceStyle}>{price} kr</Text>
          </CardSection>
        </Card>
        {this.renderDescription()}
        <Card>
          <CardSection>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 3
              }}
            >
              <Icon
                name="access-time"
                size={20}
                color="#373737"
                style={styles.iconStyle}
              />
              <Text style={styles.infoStyle}>{formattedDate}</Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 3 }}>
              <Icon
                name="person"
                size={20}
                color="#373737"
                style={styles.iconStyle}
              />
              <Text style={styles.infoStyle}>{name}</Text>
            </View>
          </CardSection>
          <CardSection>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {this.renderMessengerButton()}
              {this.renderPhoneButton()}
            </View>
          </CardSection>
          <CardSection>{this.renderDeleteButton()}</CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  headingStyle: {
    fontSize: 25,
    fontWeight: "bold"
  },
  subHeadingStyle: {
    fontSize: 15,
    color: "#373737"
  },
  priceStyle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#00C853"
  },
  rowCardStyle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  imageStyle: {
    width: "100%",
    height: 280,
    resizeMode: "contain",
    backgroundColor: "#373737"
  },
  descriptionHeadingStyle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3
  },
  descriptionTextStyle: {
    fontSize: 14,
    color: "#373737"
  },
  infoStyle: {
    fontSize: 14,
    color: "#373737",
    marginBottom: 3
  },
  iconStyle: {
    marginRight: 8
  },
  messengerStyle: {
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    backgroundColor: "#fff",
    elevation: 2,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    padding: 8,
    marginTop: 5,
    width: "40%"
  },
  titleStyle: {
    color: "black",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalContainerStyle: {
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
};

const mapStateToProps = state => {
  const loading = isLoading(["BOOK_DELETE"], state);

  return { loading };
};

export default connect(
  mapStateToProps,
  { bookDelete }
)(BookScreen);
