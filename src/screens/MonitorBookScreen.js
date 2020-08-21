import React, { Component } from "react";
import { ListItem, Icon, Button } from "react-native-elements";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import Card from "../components/Card";
import { isLoading } from "../selectors/utilSelectors";

import CardSection from "../components/CardSection";
import { monitorBooksFetch, monitorBookDelete } from "../actions";

class MonitorBookScreen extends Component {
  state = {
    isModalVisible: false
  };

  componentDidMount() {
    this.props.monitorBooksFetch();
  }

  renderMonitoredBooks() {
    if (this.props.loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      );
    }
    if (this.props.monitoredBooks.length > 0) {
      return this.props.monitoredBooks.map(monitoredBook => (
        <ListItem
          key={monitoredBook.isbn}
          title={monitoredBook.title}
          subtitle={monitoredBook.author}
          rightIcon={
            <TouchableOpacity
              onPress={() => this.props.monitorBookDelete(monitoredBook.uid)}
            >
              <Icon name="delete" />
            </TouchableOpacity>
          }
          bottomDivider
        />
      ));
    } else {
      return (
        <Text style={styles.textStyle}>Du har inga böcker bevakade ännu.</Text>
      );
    }
  }

  render() {
    return (
      <ScrollView
        style={{ backgroundColor: "#CFE3E9" }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Card>
          <CardSection>
            <Text style={styles.textHeader}>Dina bevakade böcker</Text>
            <CardSection>{this.renderMonitoredBooks()}</CardSection>
          </CardSection>
        </Card>
        <CardSection>
          <Button
            raised
            buttonStyle={{ backgroundColor: "#2ecc71" }}
            textStyle={{ textAlign: "center" }}
            title={"Lägg till bok att bevaka"}
            onPress={() => this.props.navigation.navigate("AddMonitorBook")}
          />
        </CardSection>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { monitoredBooks } = state.profile;

  const loading = isLoading(["BOOKS_FETCH_MONITORED"], state);

  return { monitoredBooks, loading };
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
    textAlign: "center"
  }
};

export default connect(
  mapStateToProps,
  { monitorBooksFetch, monitorBookDelete }
)(MonitorBookScreen);
