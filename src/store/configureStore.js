import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import rootReducer from "./rootReducer";
import api from "./middlewares/api";


export default function() {
    return configureStore({
        reducer: rootReducer,
        middleware: [
            ...getDefaultMiddleware({immutableCheck: false}),
            api
        ]
    })
}