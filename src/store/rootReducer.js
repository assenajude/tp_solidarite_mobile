import {combineReducers} from 'redux';
import authSlice from '../store/slices/authSlice'
import profileSlice from '../store/slices/userProfileSlice'

import entitiesReducers from "./entitiesReducers";

export default combineReducers({
    entities: entitiesReducers,
    auth: authSlice,
    profile: profileSlice
})