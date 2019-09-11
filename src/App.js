import React, { Component } from "react";
import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import AppContainer from "./navigation/Navigator";
import reducers from "./reducers";
import NavigationService from "./navigation/NavigationService";
import { useScreens } from "react-native-screens";
const keys = require("./config/keys");

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

useScreens();

class App extends Component {
  constructor(props) {
    super(props);

    firebase.initializeApp(keys.firebaseConfig);
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
