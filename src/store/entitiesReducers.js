import {combineReducers} from 'redux';

import payementSlice from '../store/slices/payementSlice';
import categorieSlice from '../store/slices/categorieSlice';
import shoppingCartSlice from '../store/slices/shoppingCartSlice';
import articleSlice from '../store/slices/articleSlice';
import locationSlice from '../store/slices/locationSlice';
import orderSlice from '../store/slices/orderSlice';
import planSlice from '../store/slices/planSlice'

export default combineReducers({
    payement: payementSlice,
    categorie: categorieSlice,
    shoppingCart: shoppingCartSlice,
    plan: planSlice,
    order: orderSlice,
    location: locationSlice,
    article: articleSlice

})