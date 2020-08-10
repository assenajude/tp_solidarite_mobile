import planService from "../../api/planService";
import {exp} from "react-native-reanimated";

export const SET_PLAN = 'SET_PLAN';
export const ADD_PLAN = 'ADD_PLAN';

export const  getplan = () => {
    return async dispatch => {
        try {
            const loadedPlan = await planService.getPlans();
            dispatch ({
                type: SET_PLAN,
                plans: loadedPlan.data
            })
        } catch (e) {
            throw new Error(e.message)
        }
    }

};

export const addPlan = (planData) => {
    return async dispatch => {
        try {
            const response = await planService.createPlan(planData);
            dispatch({
                type: ADD_PLAN,
                plan: response.data
            })
        } catch (e) {
            throw new Error(e.message)
        }
    }
}