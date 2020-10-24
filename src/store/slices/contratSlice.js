import {createSlice} from '@reduxjs/toolkit'
import {apiRequest} from "../actionsCreators/apiActionCreator";

const contratSlice = createSlice({
    name: contrat,
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {
        requestContrat: (state) => {
            state.loading = true
            state.error = null
        },
        contratsReceived: (state, action) => {
            state.loading = false
            state.list = action.payload
            state.error = null
        },
        contratRequestFailed: (state,action) => {
            state.loading = false
            state.error = action.payload
        },
        contratAdded: (state, action) => {
            state.loading = false
            state.list.push(action.payload)
        }
    }
})

export default contratSlice.reducer
const {contratAdded, contratRequestFailed, contratsReceived, requestContrat} = contratSlice.actions

const url = '/contrats'

/*
export const createOrderContrat = (data) => apiRequest({
    url,
    method: 'post',
    data,
    onStart: requestContrat.type,
    onSuccess: contratAdded.type,
    onError: contratRequestFailed.type

})*/
