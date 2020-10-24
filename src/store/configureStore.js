import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import rootReducer from "./rootReducer";
import api from "./middlewares/api";
import authApi from "./middlewares/auth";


export default function() {
    return configureStore({
        reducer: rootReducer,
        middleware: [
            ...getDefaultMiddleware({immutableCheck: false}),
            api,
            authApi
        ]
    })
}