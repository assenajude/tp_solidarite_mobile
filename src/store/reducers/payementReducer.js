import {ADD_PAYEMENT, GET_PAYEMENTS} from "../actions/payementActions";

const initialState = {
    payements: []
}

export default (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_PAYEMENTS:
            newState = {
                ...state,
                payements: action.payements
            }
            return newState || state
        case ADD_PAYEMENT:
            const newPayement = action.payement;
            newState = {
                ...state,
                payements: state.payements.concat(newPayement)
            }
            return newState || state
        default:
            return state
    }
}