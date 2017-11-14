import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import BookDetail from './BookDetail';

class BookList extends Component {
  state = { books: [
      { title: 'Bok 1', pic: 'https://scontent-amt2-1.xx.fbcdn.net/v/t31.0-8/23213467_1504931249542150_1900863078676633615_o.jpg?oh=5b6610ca39b1c05599d4db7549c992fe&oe=5A92EAFD', loc: 'Norrköping' },
      { title: 'Bok 2', pic: 'https://scontent-amt2-1.xx.fbcdn.net/v/t31.0-8/22291449_10210167604933508_6924622477481598703_o.jpg?oh=33fb0bdd075896d3856b477dd3684c88&oe=5A987749', loc: 'Linköping' },
      { title: 'Bok 3', pic: 'https://image.bokus.com/images2/9789144038698_200x_analys-i-flera-variabler', loc: 'Enköping' }] };

  renderBooks() {
    return this.state.books.map(book =>
      <BookDetail key={book.title} book={book} />
    );
  }

  render() {
    console.log(this.state);

    return (
      <ScrollView>
        {this.renderBooks()}
      </ScrollView>
    );
  }
}

export default BookList;
