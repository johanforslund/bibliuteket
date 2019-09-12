import React, { Component } from "react";
import { ListItem } from "react-native-elements";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
import { connect } from "react-redux";
import moment from "moment";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import { profileBooksFetch } from "../actions";

class ProfileScreen extends Component {
  componentDidMount() {
    this.props.profileBooksFetch();
  }

  onLogout() {
    firebase.auth().signOut();
  }

  handlePress = book => {
    this.props.navigation.navigate("Book", { book });
  };

  authStatus() {
    return (
      <Text>
        Verifierad mail: {this.props.user.emailVerified ? "ja" : "nej"}
      </Text>
    );
  }

  renderProfileBooks() {
    return this.props.profileBooks.map(profileBook => (
      <TouchableOpacity
        style={styles.rowCardStyle}
        key={profileBook.date}
        delayPressIn={50}
        onPress={() => this.handlePress(profileBook)}
      >
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Titel: {profileBook.title}</Text>
          <Text style={styles.textStyle}>
            Skapad: {moment(profileBook.date).format("YYYY-MM-DD | HH:SS")}
          </Text>
        </View>
        <View style={styles.imageConatiner}>
          <Image
            style={styles.imageStyle}
            source={{ uri: profileBook.imageURL }}
          />
        </View>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#CFE3E9" }}>
        <Card style={{ alignSelf: "flex-end", marginBottom: 30 }}>
          <CardSection>
            <Text>*TEMPORÄR INFO*</Text>
            <Text>{this.props.user.displayName}</Text>
            <Text>{this.props.user.email}</Text>
            {this.authStatus()}
          </CardSection>
        </Card>
        {this.props.profileBooks.length > 0 ? (
          <Card style={{ marginBottom: 30, backgroundColor: "#CFE3E9" }}>
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
            >
              Dina böcker
            </Text>
            <CardSection>{this.renderProfileBooks()}</CardSection>
          </Card>
        ) : null}
        <View>
          <ListItem
            title="Bevaka bok"
            leftIcon={{ name: "book" }}
            bottomDivider
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Settings")}
          >
            <ListItem
              title="Inställningar"
              leftIcon={{ name: "settings" }}
              bottomDivider
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onLogout}>
            <ListItem
              title="Logga ut"
              leftIcon={{ name: "log-out", type: "entypo" }}
              bottomDivider
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { profileBooks } = state.profile;
  const { user } = state.auth;

  return { profileBooks, user };
};

const styles = {
  rowCardStyle: {
    backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    backgroundColor: "#fff",
    elevation: 2,
    borderRadius: 10,
    padding: 8,
    marginTop: 5,
    width: "100%"
  },
  textContainer: {
    alignSelf: "center"
  },
  textStyle: {
    fontWeight: "bold"
  },
  imageConatiner: {
    flex: 1,
    alignItems: "flex-end"
  },
  imageStyle: {
    height: 60,
    width: 60
  }
};

export default connect(
  mapStateToProps,
  { profileBooksFetch }
)(ProfileScreen);
