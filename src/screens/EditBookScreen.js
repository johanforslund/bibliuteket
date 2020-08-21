import React, { Component } from "react";
import BookForm from "../components/BookForm";

class EditBookScreen extends Component {
  render() {
    return <BookForm editBook={this.props.navigation.getParam("editBook")} />;
  }
}

export default EditBookScreen;
