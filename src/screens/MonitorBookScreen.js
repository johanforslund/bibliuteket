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

import { monitorBooksFetch } from "../actions";

class MonitorBookScreen extends Component {
  state = {
    isModalVisible: false
  };

  componentDidMount() {
    this.props.monitorBooksFetch();
  }

  renderMonitoredBooks() {
    return this.props.monitoredBooks.map(monitoredBook => (
      <ListItem
        title={monitoredBook.title}
        subtitle={monitoredBook.author}
        rightIcon={<Icon name="delete" onPress={() => console.log("delted")} />}
        bottomDivider
      />
    ));
  }

  render() {
    return (
      <ScrollView
        style={{ backgroundColor: "#CFE3E9" }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {this.props.monitoredBooks.length > 0 ? (
          <Card>
            <CardSection>
              <Text style={styles.textHeader}>Dina bevakade böcker</Text>
              <CardSection>{this.renderMonitoredBooks()}</CardSection>
            </CardSection>
          </Card>
        ) : null}
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
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { monitoredBooks } = state.profile;

  return { monitoredBooks };
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
  { monitorBooksFetch }
)(MonitorBookScreen);
