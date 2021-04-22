
import React from "react";
import {Provider} from 'react-redux'

import configureStore from "./src/store/configureStore";

import {SafeAreaProvider} from "react-native-safe-area-context";
import AppWrapper from "./AppWrapper";
import logger from './src/utilities/logger'

logger.start()

export default function App() {
    const store = configureStore();

    return (
          <SafeAreaProvider>
             <Provider store={store}>
               <AppWrapper/>
               </Provider>
          </SafeAreaProvider>
        )
}
