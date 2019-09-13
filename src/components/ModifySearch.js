import React, { PureComponent } from "react";
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
                size={20}
                title="Nyast först"
                checked={this.props.sorting === "dateDESC"}
                onPress={() => {
                  this.props.changeSorting("dateDESC");
                  this.setState({ isModalVisible: !this.state.isModalVisible });
                }}
              />
              <CheckBox
                size={20}
                title="Äldst först"
                checked={this.props.sorting === "dateASC"}
                onPress={() => {
                  this.props.changeSorting("dateASC");
                  this.setState({ isModalVisible: !this.state.isModalVisible });
                }}
              />
              <CheckBox
                size={20}
                title="Pris lägst till högst"
                onPress={() => {
                  {
                    this.props.changeSorting("priceASC");
                    this.setState({
                      isModalVisible: !this.state.isModalVisible
                    });
                  }
                }}
                checked={this.props.sorting === "priceASC"}
              />
              <CheckBox
                size={20}
                title="Pris högst till lägst"
                onPress={() => {
                  {
                    this.props.changeSorting("priceDESC");
                    this.setState({
                      isModalVisible: !this.state.isModalVisible
                    });
                  }
                }}
                checked={this.props.sorting === "priceDESC"}
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
