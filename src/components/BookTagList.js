import React from "react";
import { View, TouchableOpacity } from "react-native";
import BookTag from "./BookTag";
import Icon from "react-native-vector-icons/MaterialIcons";

const BookTagList = () => {
  return (
    <View style={styles.containerStyle}>
      <BookTag name="TNA004"></BookTag>
      <BookTag name="lowercase"></BookTag>
      <BookTag name="MT"></BookTag>
      <TouchableOpacity>
        <Icon color="#a5a5a5" name="add" size={20} style={{ marginLeft: 2 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  containerStyle: {
    marginLeft: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  }
};

export default BookTagList;
