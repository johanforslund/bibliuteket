import React, { Component } from "react";
import { ListItem, Icon, Button, Input } from "react-native-elements";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
import { connect } from "react-redux";
import VectorIcon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import Card from "../components/Card";
import CardSection from "../components/CardSection";

import { profileBooksFetch, updateUserDetails } from "../actions";

class ProfileScreen extends Component {
  state = {
    isModalVisible: false,
    name: firebase.auth().currentUser.displayName
  };

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
    if (firebase.auth().currentUser.emailVerified) {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20
          }}
        >
          <Text>Verifierad</Text>
          <Icon
            containerStyle={{
              backgroundColor: "powderblue",
              borderRadius: 30,
              marginLeft: 10
            }}
            name="check"
            size={20}
            color="white"
          />
        </View>
      );
    }
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

  renderProfile() {
    return (
      <View>
        <View style={styles.makeRow}>
          <Text style={{ fontSize: 15 }}>
            {this.state.name || firebase.auth().currentUser.displayName}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                isModalVisible: !this.state.isModalVisible
              });
            }}
          >
            <VectorIcon
              name="edit"
              size={15}
              color="#373737"
              style={{ marginHorizontal: 5 }}
            />
          </TouchableOpacity>
          <Modal
            useNativeDriver={true}
            animationIn="slideInDown"
            animationOut="slideOutUp"
            isVisible={this.state.isModalVisible}
            onBackdropPress={() =>
              this.setState({
                isModalVisible: !this.state.isModalVisible
              })
            }
          >
            <View style={styles.modalContainerStyle}>
              <Text style={styles.titleStyle}>Ändra profilnamn</Text>
              <Input
                leftIcon={<Icon color="#a5a5a5" name="person" size={20} />}
                value={this.state.name}
                onChangeText={value => this.setState({ name: value })}
                returnKeyType="next"
              />

              <Button
                buttonStyle={{ marginTop: 20 }}
                title="Ändra profilnamn"
                onPress={() => {
                  this.setState({
                    isModalVisible: !this.state.isModalVisible
                  });
                  this.props.updateUserDetails(this.state.name);
                }}
              />
              <Button
                title="Avbryt"
                onPress={() => {
                  this.setState({
                    name: firebase.auth().currentUser.displayName,
                    isModalVisible: !this.state.isModalVisible
                  });
                }}
                type="clear"
              />
            </View>
          </Modal>
        </View>
        <View style={styles.makeRow}>
          <Text style={{ fontSize: 15 }}>
            {firebase.auth().currentUser.email}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#CFE3E9" }}>
        <Card>
          <CardSection>
            <Text style={styles.textHeader}>Användaruppgifter</Text>
            {this.renderProfile()}
            {this.authStatus()}
          </CardSection>
        </Card>
        {this.props.profileBooks.length > 0 ? (
          <Card>
            <CardSection>
              <Text style={styles.textHeader}>Dina böcker</Text>
              <CardSection>{this.renderProfileBooks()}</CardSection>
            </CardSection>
          </Card>
        ) : null}
        <Card>
          <CardSection>
            <Text style={styles.textHeader}>Övrigt</Text>
            <TouchableOpacity>
              <ListItem
                style={styles.listItemStyle}
                title="Bevaka bok"
                leftIcon={{ name: "book" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Settings")}
            >
              <ListItem
                style={styles.listItemStyle}
                title="Inställningar"
                leftIcon={{ name: "settings" }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onLogout}>
              <ListItem
                style={styles.listItemStyle}
                title="Logga ut"
                leftIcon={{ name: "log-out", type: "entypo" }}
              />
            </TouchableOpacity>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { profileBooks } = state.profile;

  return { profileBooks };
};

const styles = {
  rowCardStyle: {
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
    marginBottom: 5,
    width: "100%"
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  listItemStyle: {
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    backgroundColor: "#fff",
    elevation: 2,
    marginBottom: 5,
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
  },
  makeRow: {
    margin: 2,
    flexDirection: "row",
    alignItems: "center"
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

export default connect(
  mapStateToProps,
  { profileBooksFetch, updateUserDetails }
)(ProfileScreen);
