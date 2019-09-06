import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class ModifySearch extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <TouchableOpacity
          delayPressIn={50}
          onPress={() => console.log("sorting")}
        >
          <Icon name="sort" style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { searchTitle } = state.books;

  return { searchTitle };
};

const styles = {
  containerStyle: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  iconStyle: {
    marginRight: 8,
    color: "white",
    fontSize: 35
  }
};

export default connect(mapStateToProps)(ModifySearch);
