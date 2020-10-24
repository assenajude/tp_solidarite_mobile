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
            state.list = action.payload
            state.loading = false
        },
        payementRequestFailed: (state, action) => {
            state.loading = false
        },
        payementAdded: (state, action) => {
            state.list.push(action.payload)
        },
        selectedPayement: (state, action) => {
            const selected = state.list.filter(payement => payement.id === action.payload);
            state.selectedPayement = selected[0]
            if (selected[0].plans && selected[0].plans.length >=1) {
                const plans = selected[0].plans;
                state.payementPlans = plans
                //state.currentPlan = plans[0]
            } else {
               // state.currentPlan = {libelle: 'aucun plan dispo'}
                state.payementPlans = []
                //state.payementPlans = [{libelle: 'aucun plan dispo'}]
            }
            state.currentPlan = {}
            state.payementId = action.payload
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
        resetPayement: (state) => {
            state.selectedPayement = {}
            state.currentPlan = {}
        }
    },
    extraReducers: {
        [getSelectedPayement]: (state, action) => {
            const selectedId = action.payload
            state.selectedPayement = state.list.filter(payement => payement.id === selectedId);
            const selected = state.selectedPayement
            state.payementId = selectedId
            if(selected.plans)state.payementPlans.push(selected.plans)

        }
    }
});

export default payementSlice.reducer;

 const {getPayements, resetPayement, payementAdded, payementRequested, payementRequestFailed, selectedPayement, changeCurrentPlan, selectPlan} = payementSlice.actions;


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
