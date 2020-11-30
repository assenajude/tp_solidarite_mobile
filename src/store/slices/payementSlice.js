import {createSlice} from '@reduxjs/toolkit';
import {createSelector} from 'reselect';

import {apiRequest} from '../actionsCreators/apiActionCreator'
import {getSelectedPayement} from '../actionsCreators/payementActionCreator'
import plan from "../../models/plan";

const payementSlice = createSlice({
    name: 'payement',
    initialState: {
        list: [],
        loading: false,
        payementId: 1,
        selectedPayement: {},
        payementPlans: [],
        selectedPlan: {},
        currentPlan: {}
    },
    reducers: {
        payementRequested: (state,action)=> {
            state.loading = true
        },
        getPayements: (state, action) => {
            state.loading = false
            state.list = action.payload
          /*  if(state.list && state.list.length >= 0) {
               state.list[0].active = true
            }*/
        },
        payementRequestFailed: (state, action) => {
            state.loading = false
        },
        payementAdded: (state, action) => {
            state.list.push(action.payload)
        },
        selectedPayement: (state, action) => {
            let selected = state.list.find(payement => payement.id === action.payload);
           if(selected) {
            selected.active = true
            state.payementPlans = selected.Plans
            state.payementId = action.payload
            state.currentPlan = {}
           }
        },
        changeCurrentPlan: (state, action) => {
            state.currentPlan = action.payload;
            const planPayement = state.payementPlans.find(plan => plan.id === action.payload.id);
            if (planPayement.showIcon) {
                planPayement.showIcon = false;
            } else {
                planPayement.showIcon = true
            }
            const otherPlans = state.payementPlans.filter(plan => plan.id !== action.payload.id);
            otherPlans.forEach(plan => {
                plan.showIcon = false
            })
        },
        selectPlan: (state, action) => {
            let selectedPlan = state.payementPlans.find(plan => plan.id === action.payload.id);
            if (selectedPlan.checked) {
                selectedPlan.checked = false
            } else selectedPlan.checked = true
            const otherPlans = state.payementPlans.filter(plan => plan.id !== selectedPlan.id);
            otherPlans.forEach(plan => {
                plan.checked = false
            })
            state.currentPlan = state.payementPlans.find(plan => plan.checked === true)
        },
        activePayement: (state, action) => {
          const selectedPayement = state.list.find(item => item.id === action.payload)
            if(selectedPayement) {
            selectedPayement.active = true
            state.payementPlans = selectedPayement.Plans
            const otherPayements = state.list.filter(item => item.id !== action.payload)
            otherPayements.forEach(item => item.active = false)
            }
        },
        resetPayement: (state) => {

            state.list[0].active = true
            const otherPayements = state.list.filter(item => item.id !== state.list[0].id)
            otherPayements.forEach(item => item.active = false)
             state.payementPlans.forEach(item => item.checked = false)

        }
    },
    extraReducers: {
        [getSelectedPayement]: (state, action) => {
            const selectedId = action.payload
            state.selectedPayement = state.list.filter(payement => payement.id === selectedId);
            const selected = state.selectedPayement
            state.payementId = selectedId
            if(selected.Plans)state.payementPlans.push(selected.Plans)

        }
    }
});

export default payementSlice.reducer;

 const {getPayements, resetPayement, payementAdded,
     payementRequested, payementRequestFailed, selectedPayement,
     changeCurrentPlan, selectPlan, activePayement} = payementSlice.actions;


// actions creators
const url = '/payements'

export const loadPayements = () => apiRequest({
   url,
    method: 'get',
    onStart:payementRequested.type ,
    onSuccess: getPayements.type,
    onError: payementRequestFailed.type
})

export const createPayement = (payement) => apiRequest({
    url,
    method: 'post',
    data: payement,
    onStart: payementRequested.type,
    onSuccess: payementAdded.type,
    onError: payementRequestFailed.type
})

export const getSelected = (id) => dispatch => {
    dispatch(selectedPayement(id))
}

export const changePlan = (plan) => dispatch => {
    dispatch(changeCurrentPlan(plan))
}

export const getSelectedPlan = (plan) => dispatch => {
    dispatch(selectPlan(plan))
}

export const getResetPayement = () => dispatch => {
    dispatch(resetPayement())
}
// selectors

export const getPayementActive = (payementId) => dispatch => {
    dispatch(activePayement(payementId))
}