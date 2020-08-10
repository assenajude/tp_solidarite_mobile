import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

import articleReducer from "./reducers/articleReducer";
import locationReducer from "./reducers/locationReducer";
import shoppingCartReducer from './reducers/shoppingCartReducer';
import orderReducer from "./reducers/orderReducer";
import payementReducer from "./reducers/payementReducer";
import categorieReducer from "./reducers/categorieReducer";
import planReducer from "./reducers/planReducer";


const rootReducer = combineReducers({
    articles: articleReducer,
    categorie: categorieReducer,
    locations: locationReducer,
    shoppingCart: shoppingCartReducer,
    order: orderReducer,
    payement: payementReducer,
    plan: planReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;