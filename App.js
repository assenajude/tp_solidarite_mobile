
import React from "react";
import {Provider} from 'react-redux'
import { StyleSheet, Text, View } from "react-native";

import configureStore from "./src/store/configureStore";

import UserCompteNavigation from "./src/navigation/UserCompteNavigation";

export default function App() {
    const store = configureStore();
  return (
      <Provider store={store}>
        <UserCompteNavigation/>
      </Provider>
        )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
