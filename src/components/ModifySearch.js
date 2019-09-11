import React, { Component, PureComponent } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, TouchableOpacity, Text } from "react-native";
import { CheckBox, Button } from "react-native-elements";
import Modal from "react-native-modal";
import { changeSorting, booksFetch, booksSearch } from "../actions/BookActions";

import { connect } from "react-redux";

class ModifySearch extends PureComponent {
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
            <View>
              <CheckBox
                size={40}
                center
                title="Pris"
                onPress={() => {
                  {
                    this.props.changeSorting("price");
                    this.props.isSearching
                      ? this.props.booksSearch("price", this.props.searchText)
                      : this.props.booksFetch("price");
                    this.setState({
                      isModalVisible: !this.state.isModalVisible
                    });
                  }
                }}
                checked={this.props.sorting === "price"}
              />
              <CheckBox
                size={40}
                center
                title="Datum"
                checked={this.props.sorting === "date"}
                onPress={() => {
                  this.props.changeSorting("date");
                  this.props.isSearching
                    ? this.props.booksSearch("date", this.props.searchText)
                    : this.props.booksFetch("date");
                  this.setState({ isModalVisible: !this.state.isModalVisible });
                }}
              />
            </View>
            <Button title="Avbryt" onPress={this.toggleModal} type="clear" />
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { sorting, isSearching, searchText } = state.books;

  return { sorting, isSearching, searchText };
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
  titleStyle: {
    color: "black",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold"
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
  { changeSorting, booksFetch, booksSearch }
)(ModifySearch);
