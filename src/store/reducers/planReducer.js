import {ADD_FAILED, ADD_START, ADD_SUCCESS, SET_FAILED, SET_START, SET_SUCCESS} from "../actions/planActions";
import plan from "../../models/plan";

const initialState = {
    loadingPlan: false,
    error: null,
    plans: []
}

export default (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case SET_START:
            newState = {
                ...state,
                loadingPlan: true
            }
            return newState || state
        case SET_SUCCESS:
            const loadedPlan = action.plans;
            newState = {
                ...state,
                loadingPlan: false,
                error: null,
                plans: loadedPlan
            }
            return newState || state
        case SET_FAILED:
            const errorData = action.errorData;
            newState = {
                ...state,
                loadingPlan: false,
                error: errorData
            }
            return newState || state
        case ADD_START:
            newState = {
                ...state,
                loadingPlan: true
            }
            return newState || state
        case ADD_SUCCESS:
            const planData = action.planData;
            const newPlan = {
                id: planData.id,
                libelle: planData.libelle,
                description: planData.description,
                mensualite: planData.mensualite,
                compensation: planData.compensation,
                payementId: planData.idPayement
            }
            newState = {
                ...state,
                loadingPlan: false,
                error: null,
                plans: state.plans.concat(newPlan)
            }
            return newState || state
        case ADD_FAILED:
            newState = {
                ...state,
                loadingPlan: false,
                error: action.errorData
            }
        default:
            return state
    }
}