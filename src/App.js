import { Navigation } from 'react-native-navigation';

import BookScreen from './screens/BookScreen';
import BookListScreen from './screens/BookListScreen';
import AddBookScreen from './screens/AddBookScreen';
import ProfileScreen from './screens/ProfileScreen';

export default () => {
  Navigation.registerComponent('BookListScreen', () => BookListScreen);
  Navigation.registerComponent('BookScreen', () => BookScreen);
  Navigation.registerComponent('AddBookScreen', () => AddBookScreen);
  Navigation.registerComponent('ProfileScreen', () => ProfileScreen);

  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Hem',
        screen: 'BookListScreen',
        icon: require('./images/icon_home.png'),
        selectedIcon: require('./images/icon_home.png')
      },
      {
        label: 'Sälj bok',
        screen: 'AddBookScreen',
        icon: require('./images/icon_add.png'),
        selectedIcon: require('./images/icon_add.png')
      },
      {
        label: 'Konto',
        screen: 'ProfileScreen',
        icon: require('./images/icon_person.png'),
        selectedIcon: require('./images/icon_person.png')
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
    },
    tabsStyle: {
      tabBarButtonColor: '#94bace',
      tabBarSelectedButtonColor: '#f9fafa',
      tabBarBackgroundColor: '#29749D',
      tabBarLabelColor: '#94bace',
      tabBarSelectedLabelColor: '#f9fafa',
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
