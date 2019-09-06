import React, { Component } from "react";
import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import AppContainer from "./navigation/Navigator";
import reducers from "./reducers";
import NavigationService from "./navigation/NavigationService";

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
  constructor(props) {
    super(props);
    const config = {
      apiKey: "AIzaSyD04Ttv-pdfc6V9hlh2oBChnL_vtZOvk9E",
      authDomain: "koma-26e03.firebaseapp.com",
      databaseURL: "https://koma-26e03.firebaseio.com",
      projectId: "koma-26e03",
      storageBucket: "koma-26e03.appspot.com",
      messagingSenderId: "943209967796"
    };
    firebase.initializeApp(config);
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}

export default App;
