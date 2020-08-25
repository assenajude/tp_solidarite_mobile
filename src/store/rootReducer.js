import {combineReducers} from 'redux'

import entitiesReducers from "./entitiesReducers";

export default combineReducers({
    entities: entitiesReducers
})