import {combineReducers} from 'redux';

import payementSlice from '../store/slices/payementSlice';
import categorieSlice from '../store/slices/categorieSlice';
import shoppingCartSlice from '../store/slices/shoppingCartSlice';
import articleSlice from '../store/slices/articleSlice';
import locationSlice from '../store/slices/locationSlice';
import orderSlice from '../store/slices/orderSlice';
import planSlice from '../store/slices/planSlice';
import shippingAdresseSlice from '../store/slices/shippingAdresseSlice';
import pointRelaisSlice from '../store/slices/pointRelaisSlice';
import regionSlice from '../store/slices/regionSlice'
import villeSlice from '../store/slices/villeSlice'
import userAdresseSlice from '../store/slices/userAdresseSlice'
import factureSlice from '../store/slices/factureSlice'
import trancheSlice from './slices/trancheSlice'
import serviceSlice from './slices/serviceSlice'
import mainSlice from './slices/mainSlice'
import userLocationSlice from './slices/userLocationSlice'
import userServiceSlice from './slices/userServiceSlice'
import userOrderSlice from './slices/userOrderSlice'

export default combineReducers({
    payement: payementSlice,
    categorie: categorieSlice,
    shoppingCart: shoppingCartSlice,
    plan: planSlice,
    order: orderSlice,
    location: locationSlice,
    article: articleSlice,
    shippingAddress: shippingAdresseSlice,
    pointRelais: pointRelaisSlice,
    region: regionSlice,
    ville: villeSlice,
    userAdresse: userAdresseSlice,
    facture: factureSlice,
    tranche: trancheSlice,
    service: serviceSlice,
    main: mainSlice,
    userLocation: userLocationSlice,
    userService: userServiceSlice,
    userOrder: userOrderSlice

})