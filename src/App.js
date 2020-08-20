import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";
import AppContainer from "./navigation/Navigator";
import reducers from "./reducers";
import NavigationService from "./navigation/NavigationService";
import { useScreens } from "react-native-screens";
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
const keys = require("./config/keys");

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["settings"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));

useScreens();

class App extends Component {
  constructor(props) {
    super(props);

    console.disableYellowBox = true;
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <SafeAreaProvider>
            <AppContainer
              ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#29749D",
  },
});

export default App;
