import {createSlice} from "@reduxjs/toolkit";
import {apiRequest} from "../actionsCreators/apiActionCreator";

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
      loading: false,
      list: [],
      error: null
    },
    reducers: {
        serviceRequested: (state) =>{
            state.loading = true
            state.error = null
        },
        serviceReceived: (state, action) => {
            state.loading = false
            state.error = null
            state.list = action.payload
        },
        serviceRequestFailed:(state, action) => {
            state.loading = false
            state.error = action.payload
        },
        serviceAdded: (state, action)=> {
            state.loading = false
            state.error = null
            state.list.push(action.payload)
        }
    }
})


const {serviceAdded, serviceReceived, serviceRequested, serviceRequestFailed} = serviceSlice.actions
export default serviceSlice.reducer

const url = '/services'

export const getServices = () => apiRequest({
    url,
    method: 'get',
    onStart: serviceRequested.type,
    onSuccess: serviceReceived.type,
    onError: serviceRequestFailed.type
})

export const addService = (service) => apiRequest({
    url,
    method: 'post',
    data: service,
    onStart: serviceRequested.type,
    onSuccess: serviceAdded.type,
    onError:serviceRequestFailed.type
})