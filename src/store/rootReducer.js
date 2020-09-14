import {combineReducers} from 'redux';
import authSlice from '../store/slices/authSlice'

import entitiesReducers from "./entitiesReducers";

export default combineReducers({
    entities: entitiesReducers,
    auth: authSlice
})