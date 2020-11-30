import {createSlice} from "@reduxjs/toolkit";
import {apiRequest} from "../actionsCreators/apiActionCreator";


const factureSlice = createSlice({
    name:'facture',
    initialState: {
        userFactures: [],
        newAdded: {},
        loading: false,
        error: null,
        orderFacture: {}
    },
    reducers: {
        factureRequested: (state, action) => {
            state.loading = true
            state.error = null

        },
        factureAdded: (state, action) => {
            state.loading = false
            state.error = null
            state.newAdded = action.payload
            state.userFactures.push(action.payload)
        },
        factureRequestFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        factureReceived: (state, action) => {
            state.loading = false
            state.error = null
            const userFactures = action.payload
            state.userFactures = userFactures
            let factureRatio = 0
            state.userFactures.forEach(facture => {
                factureRatio = facture.solde/facture.montant
                factureRatio.toFixed(2)
                facture.ratio = Number(factureRatio)
            })
        },
        userFactures: (state, action) => {
            state.userFactures = action.payload
        },
        showItemTranche: (state, action) => {
            let selectedItem = state.userFactures.find(item => item.id === action.payload)
            selectedItem.ok = true
            if(selectedItem.showTranche){
                selectedItem.showTranche = false
            } else {
                selectedItem.showTranche = true
                const otherItem = state.userFactures.filter(item => item.id !== action.payload)
                otherItem.forEach(item => item.showTranche = false)
            }
        },
        factureUpdated: (state, action) => {
            state.error = null
            state.loading = false
            const updatedIndex = state.userFactures.findIndex(item => item.id === action.payload.id)
            state.userFactures.splice(updatedIndex, 1, action.payload)
        }
    }
})

export default factureSlice.reducer
const {factureAdded, factureReceived, factureRequested, factureUpdated, factureRequestFailed, showItemTranche} = factureSlice.actions


//action creators
const url = '/factures'

export const addFacture = (facture) => apiRequest({
        url,
        method: 'post',
        data: facture,
        onStart: factureRequested.type,
        onSuccess: factureAdded.type,
        onError: factureRequestFailed.type
    })



export const getFactures = () => apiRequest({
    url,
    method: 'get',
    onStart: factureRequested.type,
    onSuccess: factureReceived.type,
    onError: factureRequestFailed.type

})

export const getTrancheShown = (factureId) => dispatch =>{
    dispatch(showItemTranche(factureId))
}



export const getFactureUpdated = (facture) => apiRequest({
    url: url+'/update',
    method: 'patch',
    data:facture,
    onStart: factureRequested.type,
    onSuccess: factureUpdated.type,
    onError: factureRequestFailed.type
})


export const getFacturesByUser = () => apiRequest({
    url: url+'/byUser',
    method: 'get',
    onStart: factureRequested.type,
    onSuccess:factureReceived.type,
    onError: factureRequestFailed.type
})