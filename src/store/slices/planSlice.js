import {createSlice} from "@reduxjs/toolkit";


import {apiRequest} from "../actionsCreators/apiActionCreator";

const planSlice = createSlice({
    name: 'plan',
    initialState: {
        loadingPlan: false,
        error: null,
        list: [],
        plansPayement:[],
    },
    reducers: {
        planRequested: (state, action)=> {
            state.loadingPlan = true
        },
        planReceived: (state,action)=> {
           state.list = action.payload
           state.loadingPlan = false
        },
        planRequestfailed: (state, action)=> {
            state.loadingPlan = false
            state.error = action.payload
        },
        planAdded: (state, action) => {
            state.list.push(action.payload)
            state.loadingPlan = false
        }
    }
})

export default planSlice.reducer
const {planAdded,planReceived, planRequested, planRequestfailed} = planSlice.actions

//actions creators

const url = '/plans'

export const loadPlans = () => apiRequest({
    url,
    method:'get',
    onStart: planRequested.type,
    onSuccess: planReceived.type,
    onError: planRequestfailed.type
})


export const addPlan = (plan) => apiRequest({
    url,
    method: 'post',
    data: plan,
    onStart: planRequested.type,
    onSuccess: planAdded.type,
    onError: planRequestfailed.type
});
