import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const BookTag = props => {
  return (
    <TouchableOpacity style={styles.containerStyle}>
      <Text style={styles.textStyle}>#{props.name}</Text>
      <Icon color="#a5a5a5" name="close" size={12} style={{ marginLeft: 2 }} />
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    borderRadius: 12,
    padding: 6,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 6,
    marginRight: 6,
    backgroundColor: "powderblue"
  },
  textStyle: {
    fontSize: 12,
    textTransform: "uppercase"
  }
};

export default BookTag;
