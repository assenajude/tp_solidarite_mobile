import {createSlice} from '@reduxjs/toolkit';

import {apiRequest} from '../actionsCreators/apiActionCreator'

const shippingSlice = createSlice({
    name: 'shippingAdresse',
    initialState: {
        list: [],
        adresseVilles: [],
        loading: false,
    },
    reducers: {
        adresseApiRequested: (state, action) => {
            state.loading = true
        },
        adresseAdded: (state,action) => {
            state.list.push(action.payload)
            state.loading = false
        },
        adresseApiRequestFailed: (state, action) => {
            state.loading = false
        },
        shippingAdReceived: (state, action) => {
           state.loading = false
            state.list = action.payload
        },
        getAdresseVilles: (state, action) => {
            const selectedRegions = state.list.filter(adresse => adresse.region === action.payload)
            state.adresseVilles = selectedRegions.map(adresse => adresse.ville)
        }
    },
    extraReducers: {}
})

const {adresseApiRequested, adresseApiRequestFailed, adresseAdded, shippingAdReceived, getAdresseVilles} = shippingSlice.actions;

export default shippingSlice.reducer

const url = '/adresseLivraisons'


export const getAllShippingAdress = () => apiRequest({
    url,
    method: 'get',
    onStart: adresseApiRequested.type,
    onSuccess: shippingAdReceived.type,
    onError: adresseApiRequestFailed.type
})

export const addShippingAdresse = (shipping) => dispatch => {
    dispatch(apiRequest({
        url,
        method: 'post',
        data: shipping,
        onStart: adresseApiRequested.type,
        onSuccess: adresseAdded.type,
        onError: adresseApiRequestFailed.type

    }))
}

export const getSelectedAdVilles = (region) => dispatch => {
    dispatch(getAdresseVilles(region))
}