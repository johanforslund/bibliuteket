import { Navigation } from 'react-native-navigation';

import BookScreen from './screens/BookScreen';
import BookListScreen from './screens/BookListScreen';
import AddBookScreen from './screens/AddBookScreen';

export default () => {
  Navigation.registerComponent('BookListScreen', () => BookListScreen);
  Navigation.registerComponent('BookScreen', () => BookScreen);
  Navigation.registerComponent('AddBookScreen', () => AddBookScreen);

  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Böcker',
        screen: 'BookListScreen',
        icon: require('./images/icon1.png'),
        selectedIcon: require('./images/icon1_selected.png')
      },
      {
        label: 'Lägg till',
        screen: 'AddBookScreen',
        icon: require('./images/icon2.png'),
        selectedIcon: require('./images/icon2_selected.png')
      }
    ],
    appStyle: {
      tabBarButtonColor: '#ffffff',
      tabBarSelectedButtonColor: '#ffffff',
      tabBarBackgroundColor: '#29749D',
      tabBarLabelColor: '#ffffff',
      tabBarSelectedLabelColor: '#ffffff',
      forceTitlesDisplay: true,
      navBarBackgroundColor: '#29749D',
      navBarTextColor: '#ffffff',
      navBarButtonColor: '#ffffff'
    }
  });
};

// import React from 'react';
// import { View } from 'react-native';
// import BookView from './components/BookView';
//
// // Create a component
// const App = () => (
//   <View style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
//      {/*<BookList />*/}
//      <BookView />
//   </View>
// );
//
// // Render it to the device
//
// export default App;
