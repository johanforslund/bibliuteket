import React, { Component } from "react";
import "@firebase/auth"; //eslint-disable-line
import BookForm from "../components/BookForm";

class AddBookScreen extends Component {
  render() {
    return (
      <BookForm
        storedBook={this.props.navigation.getParam("storedBook", undefined)}
      />
    );
  }
}

export default AddBookScreen;
