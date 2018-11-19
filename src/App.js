import React, { Component } from 'react';
import firebase from '@firebase/app'
import '@firebase/auth'
import AppContainer from './Navigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    const config = {
      apiKey: 'AIzaSyD04Ttv-pdfc6V9hlh2oBChnL_vtZOvk9E',
      authDomain: 'koma-26e03.firebaseapp.com',
      databaseURL: 'https://koma-26e03.firebaseio.com',
      projectId: 'koma-26e03',
      storageBucket: 'koma-26e03.appspot.com',
      messagingSenderId: '943209967796'
    };
    firebase.initializeApp(config);
  }

  render() {
    return <AppContainer />;
  }
}
