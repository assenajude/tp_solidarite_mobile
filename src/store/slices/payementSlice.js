import {createSlice} from '@reduxjs/toolkit';
import {createSelector} from 'reselect'

import {apiRequest} from '../actionsCreators/apiActionCreator'

const payementSlice = createSlice({
    name: 'payement',
    initialState: {
        list: [],
        loading: false
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
        }
    }
});

export default payementSlice.reducer;

 const {getPayements, payementAdded, payementRequested, payementRequestFailed} = payementSlice.actions;


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


// selectors

export const listPayementSelector = createSelector(
    state => state.entities.payement.list,
    payements => payements
)