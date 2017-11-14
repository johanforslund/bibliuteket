import React from 'react';
import { View } from 'react-native';
import BookView from './components/BookView';

// Create a component
const App = () => (
  <View style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
     {/*<BookList />*/}
     <BookView />
  </View>
);

// Render it to the device

export default App;
