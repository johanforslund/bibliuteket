import { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import moment from 'moment';
import 'moment/locale/sv';
import BookScreen from './screens/BookScreen';
import BookListScreen from './screens/BookListScreen';
import AddBookScreen from './screens/AddBookScreen';
import ProfileScreen from './screens/ProfileScreen';
import reducers from './reducers';
import { iconsLoaded, iconsMap } from './utils/AppIcons';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

Navigation.registerComponent('BookListScreen', () => BookListScreen, store, Provider);
Navigation.registerComponent('BookScreen', () => BookScreen, store, Provider);
Navigation.registerComponent('AddBookScreen', () => AddBookScreen, store, Provider);
Navigation.registerComponent('ProfileScreen', () => ProfileScreen, store, Provider);

class App extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];
    moment.locale('sv');
    const config = {
      apiKey: 'AIzaSyD04Ttv-pdfc6V9hlh2oBChnL_vtZOvk9E',
      authDomain: 'koma-26e03.firebaseapp.com',
      databaseURL: 'https://koma-26e03.firebaseio.com',
      projectId: 'koma-26e03',
      storageBucket: 'koma-26e03.appspot.com',
      messagingSenderId: '943209967796'
    };
    firebase.initializeApp(config);
    iconsLoaded.then(() => {
      this.startApp();
    });
  }

  startApp() {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Hem',
          screen: 'BookListScreen',
          icon: iconsMap.home
        },
        {
          label: 'Sälj bok',
          screen: 'AddBookScreen',
          icon: iconsMap.add
        },
        {
          label: 'Konto',
          screen: 'ProfileScreen',
          icon: iconsMap.person
        }
      ],
      appStyle: {
        tabBarButtonColor: '#94bace',
        tabBarSelectedButtonColor: '#f9fafa',
        tabBarBackgroundColor: '#29749D',
        tabBarLabelColor: '#94bace',
        tabBarSelectedLabelColor: '#f9fafa',
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
  }
}

export default App;
