
import React, {useState} from "react";
import {Provider} from 'react-redux'
import { StyleSheet, Text, View } from "react-native";

import configureStore from "./src/store/configureStore";

import UserCompteNavigation from "./src/navigation/UserCompteNavigation";
import {AppLoading} from "expo";
import authStorage from './src/store/persistStorage';

export default function App() {
    const store = configureStore();

    const [user, setUser] = useState()
    const [isReady, setIsReady] = useState(false)

    const restoreUser = async () => {
            const user = await authStorage.getUser();
            if (user) setUser(user)
    }


    if(!isReady) {
        return <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    }

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
