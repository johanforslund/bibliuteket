import React, { Component } from "react";
import { ListItem, Icon, Button, Input } from "react-native-elements";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import firebase from "react-native-firebase";
import { connect } from "react-redux";
import VectorIcon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import Card from "../components/Card";
import CardSection from "../components/CardSection";

import { profileBooksFetch, updateUserDetails } from "../actions";

class MonitorBookScreen extends Component {
  state = {
    isModalVisible: false
  };

  render() {
    return (
      <ScrollView
        style={{ backgroundColor: "#CFE3E9" }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <CardSection>
          <Button
            raised
            buttonStyle={{ backgroundColor: "#2ecc71" }}
            textStyle={{ textAlign: "center" }}
            title={"Lägg till bok att bevaka"}
            loading={this.props.loading}
            onPress={() => this.props.navigation.navigate("AddMonitorBook")}
          />
        </CardSection>
        <Card>
          <CardSection>
            <Text style={styles.textHeader}>Dina bevakade böcker</Text>
            <CardSection>
              <View style={styles.rowCardStyle}>
                <View style={styles.textContainer}>
                  <Text style={styles.textStyle}>Titel: Bevakad bok 1</Text>
                  <Icon
                    name="delete"
                    size={25}
                    color="#373737"
                    style={styles.iconStyle}
                    onPress={() => console.log("item deleted")}
                  />
                </View>
              </View>
            </CardSection>
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
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textStyle: {
    fontWeight: "bold"
  },
  titleStyle: {
    color: "black",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
};

export default connect(
  mapStateToProps,
  { profileBooksFetch, updateUserDetails }
)(MonitorBookScreen);
