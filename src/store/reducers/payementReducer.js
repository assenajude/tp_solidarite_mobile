import {ADD_STARTED, GET_SUCCESS, GET_FAILED, GET_STARTED, ADD_SUCCESS, ADD_FAILED} from "../actions/payementActions";
import payement from "../../models/payement";

const initialState = {
    loading:false,
    error: null,
    payements: []
}

export default (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_STARTED:
            newState = {
                ...state,
                loading: true
            };
            return newState || state
        case GET_SUCCESS:
            const newPayements = action.loadedPayments.map(item =>new payement(item.id, item.mode));
        /*    const payementsMaped = [];
            let newItem = {}
            newPayements.forEach(item => {
                newItem = new payement(item.id, item.mode);
                payementsMaped.push(newItem)
            })*/
            newState = {
                ...state,
                loading: false,
                error: null,
                payements: newPayements
            }
            return newState || state
        case GET_FAILED:
            newState = {
                ...state,
                loading: false,
                error: action.errorContent
            }
        case ADD_STARTED:
            newState = {
                ...state,
                loading: true
            }
            return newState || state
        case ADD_SUCCESS:
            const newPayement = action.payement
            newState = {
                ...state,
                loading: false,
                error: null,
                payements: state.payements.concat(newPayement)
            }
            return newState || state
        case ADD_FAILED:
            const errorValue = action.errorData;
            newState = {
                ...state,
                loading: false,
                error: errorValue
            }
        default:
            return state
    }
}