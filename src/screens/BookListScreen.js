import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import BookDetail from '../components/BookDetail';

class BookList extends Component {
  state = { books: [
      { title: 'Bok 1', pic: 'https://scontent-amt2-1.xx.fbcdn.net/v/t31.0-8/23213467_1504931249542150_1900863078676633615_o.jpg?oh=5b6610ca39b1c05599d4db7549c992fe&oe=5A92EAFD', loc: 'Norrköping' },
      { title: 'Bok 2', pic: 'https://scontent-amt2-1.xx.fbcdn.net/v/t31.0-8/22291449_10210167604933508_6924622477481598703_o.jpg?oh=33fb0bdd075896d3856b477dd3684c88&oe=5A987749', loc: 'Linköping' },
      { title: 'Bok 3', pic: 'https://image.bokus.com/images2/9789144038698_200x_analys-i-flera-variabler', loc: 'Enköping' },
      { title: 'Mitt liv som knarkbaron', pic: 'https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/11402781_10205922494654323_1508583514649894409_o.jpg?oh=f491fa2955eb9ae204b313b648393044&oe=5AAB5ABF', loc: 'Sture-p' },
      { title: 'Analys 3', pic: 'https://images-na.ssl-images-amazon.com/images/I/51PBWMZJ3BL._SX258_BO1,204,203,200_.jpg', loc: 'Någonstans' }] };

  handlePress = () => {
    this.props.navigator.push({
      screen: 'BookScreen'
    });
  }

  renderBooks() {
    return this.state.books.map(book =>
      <TouchableOpacity key={book.title} onPress={this.handlePress}>
        <BookDetail key={book.title} book={book} />
      </TouchableOpacity>
    );
  }

  render() {
    console.log(this.state);

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
        {this.renderBooks()}
      </ScrollView>
    );
  }
}

export default BookList;
