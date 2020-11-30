import {apiRequest} from "../actionsCreators/apiActionCreator";
import {createSlice} from "@reduxjs/toolkit";


const colorAndSizeSlice = createSlice({
    name: 'colorAndSize',
    initialState: {
        couleurs: [],
        tailles: [],
        loading: false,
        error: null
    },
    reducers: {
        colorAndSizeRequested: (state) => {
            state.loading = true
            state.error = null
        },
        colorAndSizeRequestFailed: (state, action) => {
          state.loading = false
          state.error = action.payload
        },
        colorAndSizeReceived: (state, action) => {
            state.loading = false
            state.error = null
            state.couleurs = action.payload.couleurs
            state.tailles = action.payload.tailles
        },
        colorOrSizeAdded: (state, action) => {
            state.loading = false
            state.error = null
           const payloadKeys =  Object.keys(action.payload)
            if(payloadKeys.indexOf('couleur') !== -1) {
                state.couleurs.push(action.payload)
            } else {
                state.tailles.push(action.payload)
            }
        }
    }
})

export default colorAndSizeSlice.reducer
const {colorAndSizeReceived, colorAndSizeRequested, colorAndSizeRequestFailed, colorOrSizeAdded} = colorAndSizeSlice.actions

const url = '/colorAndSize'

export const addColor = (coleur) => apiRequest({
    url: url+'/couleurs',
    data: coleur,
    method: 'post',
    onStart: colorAndSizeRequested.type,
    onSuccess: colorOrSizeAdded.type,
    onError: colorAndSizeRequestFailed.type
})

export const addTaille = (taille) => apiRequest({
    url: url+'/tailles',
    data: taille,
    method: 'post',
    onStart: colorAndSizeRequested.type,
    onSuccess: colorOrSizeAdded.type,
    onError: colorAndSizeRequestFailed.type
})

export const getColorAndSize = () => apiRequest({
    url,
    method: 'get',
    onStart: colorAndSizeRequested.type,
    onSuccess: colorAndSizeReceived.type,
    onError: colorAndSizeRequestFailed.type
})