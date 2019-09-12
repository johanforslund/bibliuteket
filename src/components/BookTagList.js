import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import BookTag from "./BookTag";
import Icon from "react-native-vector-icons/MaterialIcons";

class BookTagList extends Component {
  state = {
    tagName: ""
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <Input
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                this.state.tagName.trim()
                  ? this.props.setTag(this.state.tagName)
                  : null;
                this.setState({ tagName: "" });
              }}
            >
              <Icon
                color="#a5a5a5"
                name="add"
                size={30}
                style={{ marginLeft: 2 }}
              />
            </TouchableOpacity>
          }
          ref="Tags"
          returnKeyType="go"
          autoCapitalize="sentences"
          label="Lägg till tags"
          inputStyle={{ paddingVertical: 0 }}
          maxLength={35}
          onSubmitEditing={() => {
            this.state.tagName.trim()
              ? this.props.setTag(this.state.tagName)
              : null;
            this.setState({ tagName: "" });
          }}
          value={this.state.tagName}
          onChangeText={value => this.setState({ tagName: value })}
        />
        {this.props.tags.map(tag => {
          return <BookTag name={tag}></BookTag>;
        })}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    marginLeft: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  }
};

export default BookTagList;
