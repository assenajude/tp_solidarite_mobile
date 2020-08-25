import planService from "../../api/planService";
import {cos, exp} from "react-native-reanimated";

export const SET_START = 'SET_PLAN';
export const SET_SUCCESS = 'SET_SUCCESS';
export const SET_FAILED = 'SET_FAILED'
export const ADD_START = 'ADD_START';
export const ADD_SUCCESS = 'ADD_SUCCESS';
export const ADD_FAILED = 'ADD_FAILED';

export const  getplan = () => {
    return async dispatch => {
        const setStart = () => {
            dispatch({
                type: SET_START
            })
        };

        const setSuccess = (planData) => {
            dispatch({
                type: SET_SUCCESS,
                plans: planData
            })
        };
        const setFailed = (error) => {
            dispatch({
                type: SET_FAILED,
                errorData: error
            })
        }
        try {
            setStart();
            const loadedPlan = await planService.getPlans();
           if (!loadedPlan.ok) return setFailed(loadedPlan.problem);
           return setSuccess(loadedPlan.data)
        } catch (e) {
            setFailed(e.message)
        }
    }

};

export const addPlan = (planData) => {
    return async dispatch => {
        const addStart = () => {
            dispatch({
                type: ADD_START
            })
        };

        const addSuccess = (plan) => {
            dispatch({
                type: ADD_SUCCESS,
                planData: plan
            })
        };
        const addFailed = (error) => {
            dispatch({
                type: ADD_FAILED,
                errorData: error
            })

        }
        try {
            addStart();
            const response = await planService.createPlan(planData);
          if (!response.ok) return addFailed(response.problem);
          return addSuccess(response.data)
        } catch (e) {
            return addFailed(e.message)
        }
    }
}