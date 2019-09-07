import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, TouchableOpacity, Text } from "react-native";
import { CheckBox, Button } from "react-native-elements";
import Modal from "react-native-modal";
import { changeSorting, booksFetch } from "../actions/BookActions";

import { connect } from "react-redux";

class ModifySearch extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <TouchableOpacity delayPressIn={50} onPress={this.toggleModal}>
          <Icon name="sort" style={styles.iconStyle} />
        </TouchableOpacity>
        <Modal
          useNativeDriver={true}
          animationIn="slideInDown"
          animationOut="slideOutUp"
          isVisible={this.state.isModalVisible}
          onBackdropPress={this.toggleModal}
        >
          <View style={styles.modalContainerStyle}>
            <Text style={styles.titleStyle}>Sortera efter...</Text>
            <CheckBox
              center
              title="Pris"
              onPress={() => {
                {
                  this.props.changeSorting("price");
                  this.props.booksFetch("price");
                  this.setState({ isModalVisible: !this.state.isModalVisible });
                }
              }}
              checked={this.props.sorting === "price"}
            />
            <CheckBox
              center
              title="Datum"
              checked={this.props.sorting === "date"}
              onPress={() => {
                this.props.changeSorting("date");
                this.props.booksFetch("date");
                this.setState({ isModalVisible: !this.state.isModalVisible });
              }}
            />
            <Button title="Avbryt" onPress={this.toggleModal} />
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { sorting } = state.books;

  return { sorting };
};

const styles = {
  containerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  iconStyle: {
    marginRight: 8,
    color: "white",
    fontSize: 35
  },
  checkboxesStyle: {
    height: 300,
    width: 200
  },
  titleStyle: {
    alignSelf: "center",
    color: "black",
    fontSize: 20,
    marginBottom: 20
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
  { changeSorting, booksFetch }
)(ModifySearch);
