
import React from "react";
import {Provider} from 'react-redux'
import { StyleSheet} from "react-native";
import {useNetInfo} from "@react-native-community/netinfo";

import configureStore from "./src/store/configureStore";

import {NavigationContainer} from "@react-navigation/native";
import UserCompteNavigation from "./src/navigation/UserCompteNavigation";
import {SafeAreaProvider} from "react-native-safe-area-context";
import OfflineNotice from "./src/components/OfflineNotice";


export default function App() {
    const store = configureStore();
    const netInfo = useNetInfo()
    const noInternet = netInfo.type !== "unknown" && netInfo.isInternetReachable === false

    return (
          <SafeAreaProvider>
                    {/*{ noInternet && <OfflineNotice/>}*/}
             <Provider store={store}>
                  <NavigationContainer>
                    <UserCompteNavigation/>
                 </NavigationContainer>
               </Provider>
          </SafeAreaProvider>
        )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
