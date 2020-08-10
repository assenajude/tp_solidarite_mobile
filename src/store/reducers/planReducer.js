import {ADD_PLAN, SET_PLAN} from "../actions/planActions";

const initialState = {
    plans: []
}

export default (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case SET_PLAN:
            const newLoadedPlans = action.plans
            newState = {
                ...state,
                plans: newLoadedPlans
            }
            return newState || state
        case ADD_PLAN:
           const newPlan = action.plan;
            newState = {
                ...state,
                plans: state.plans.concat(newPlan)
            }
            return newState || state
        default:
            return state
    }
}