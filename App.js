
import React from "react";
import {Provider} from 'react-redux'
import { StyleSheet, Text, View } from "react-native";

import TabNavigation from "./src/navigation/TabNavigation";
import store from "./src/store/configureStore";
import AppSearchBar from "./src/components/AppSearchBar";
import HomeScreen from "./src/screens/HomeScreen";
import UserCompteNavigation from "./src/navigation/UserCompteNavigation";

export default function App() {
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
