import {createSlice} from '@reduxjs/toolkit';

import {apiRequest} from '../actionsCreators/apiActionCreator'

const payementSlice = createSlice({
    name: 'payement',
    initialState: {
        list: [],
        loading: false,
        error: null,
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
        },
        payementRequestFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        payementAdded: (state, action) => {
            state.list.push(action.payload)
        },
        selectedPayement: (state, action) => {
            let selected = state.list.find(payement => payement.id === action.payload);
           if(selected) {
            selected.active = true
                const plans = selected.Plans
               if( plans && plans.length>0) {
               plans.sort((a, b) => {
                   if(b.nombreMensualite < a.nombreMensualite ) return 1
                   if (b.nombreMensualite > a.nombreMensualite) return -1
                   return 0;
               })
                state.payementPlans = plans
               }
            state.payementId = action.payload
            state.currentPlan = {}
           }
           const otherPayments = state.list.filter(payement => payement.id !== action.payload)
            otherPayments.forEach(item => item.active = false)
        },
        selectPlan: (state, action) => {
            let selectedPlan = state.payementPlans.find(plan => plan.id === action.payload.id);
            selectedPlan.checked = !selectedPlan.checked
            state.currentPlan = selectedPlan.checked?selectedPlan:{}
            const otherPlans = state.payementPlans.filter(plan => plan.id !== selectedPlan.id);
            otherPlans.forEach(plan => {
                plan.checked = false
            })
        },
        activePayement: (state, action) => {
          let selectedPayement = state.list.find(item => item.id === action.payload)
            state.selectedPayement = selectedPayement
            state.currentPlan = {}
            selectedPayement.active = true
            const plansOfPayement = selectedPayement.Plans
            plansOfPayement.sort((a, b) => {
                if(b.nombreMensualite < a.nombreMensualite ) return 1
                if (b.nombreMensualite > a.nombreMensualite) return -1
                return 0;
            })
            state.payementPlans = plansOfPayement
            const otherPayements = state.list.filter(item => item.id !== action.payload)
            otherPayements.forEach(item => item.active = false)

        },
        disablePayement: (state, action)=> {
          let selectedPayement = state.list.find(item => item.id === action.payload)
            selectedPayement.isDisabled = true

        },
        resetPayement: (state) => {

            state.list[0].active = true
            const otherPayements = state.list.filter(item => item.id !== state.list[0].id)
            otherPayements.forEach(item => item.active = false)
             state.payementPlans.forEach(item => item.checked = false)
            state.currentPlan = {}
        },
        showPlanDetail: (state, action) => {
            let selectedPlan = state.payementPlans.find(plan => plan.id === action.payload)
            selectedPlan.showPlanDetail = !selectedPlan.showPlanDetail
            const otherPlans = state.payementPlans.filter(plan =>  plan.id !== action.payload)
            otherPlans.forEach(plan => plan.showPlanDetail = false)
        },
        showCurrentPlanDetail: (state) => {
            state.currentPlan.CurrentPlanDetail = !state.currentPlan.CurrentPlanDetail
        }
    }
});

export default payementSlice.reducer;

 const {getPayements, resetPayement, payementAdded,
     payementRequested, payementRequestFailed, selectedPayement,
      selectPlan, activePayement, disablePayement,
     showPlanDetail, showCurrentPlanDetail} = payementSlice.actions;


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

export const getPayementDisabled = (payementId) => dispatch => {
    dispatch(disablePayement(payementId))
}

export const getPlanDetail = (planId) => dispatch => {
    dispatch(showPlanDetail(planId))
}

export const getCurrentPlanDetail = () => dispatch => {
    dispatch(showCurrentPlanDetail())
}