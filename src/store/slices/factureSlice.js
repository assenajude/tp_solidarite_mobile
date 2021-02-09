import {createSlice} from "@reduxjs/toolkit";
import {apiRequest} from "../actionsCreators/apiActionCreator";


const factureSlice = createSlice({
    name:'facture',
    initialState: {
        list: [],
        userFactures: [],
        encoursList: [],
        soldeList: [],
        newAdded: {},
        loading: false,
        error: null,
        orderFacture: {},
        newFactureCompter: 0
    },
    reducers: {
        factureRequested: (state, action) => {
            state.loading = true
            state.error = null

        },
        factureAdded: (state, action) => {
            state.loading = false
            state.error = null
            state.newFactureCompter ++
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
            state.newFactureCompter = 0
            const userFactures = action.payload
            state.userFactures = userFactures
            state.encoursList = userFactures.filter(item => item.montant !== item.solde)
            state.soldeList = userFactures.filter(item => item.montant === item.solde)


        },
        showItemTranche: (state, action) => {
            let selectedItem = state.userFactures.find(item => item.id === action.payload)
            selectedItem.showTranche = !selectedItem.showTranche
            if(selectedItem.montant === selectedItem.solde) {
                let soldeItem = state.soldeList.find(item => item.id === selectedItem.id)
                soldeItem.showTranche = !soldeItem.showTranche
            } else {
                let encoursItem = state.encoursList.find(item => item.id === selectedItem.id)
                encoursItem.showTranche = !encoursItem.showTranche
            }
        },
        factureUpdated: (state, action) => {
            state.error = null
            state.loading = false
            const updatedIndex = state.userFactures.findIndex(item => item.id === action.payload.id)
            state.userFactures.splice(updatedIndex, 1, action.payload)
            if(action.payload.montant === action.payload.solde) {
                let soldeIndex = state.encoursList.findIndex(item => item.id === action.payload.id)
                state.encoursList.splice(soldeIndex, 1)
                state.soldeList.push(action.payload)
            } else {
                let encoursIndex = state.encoursList.findIndex(item => item.id === action.payload.id)
                state.encoursList.splice(encoursIndex, 1, action.payload)
            }
        },
        resetConnectedFactures: (state) => {
            state.list =  []
            state.userFactures =  []
            state.encoursList =  []
            state.soldeList =  []
            state.newAdded =  {}
            state.loading =  false
            state.error =  null
            state.orderFacture =  {}
            state.newFactureCompter =  0
        }
    }
})

export default factureSlice.reducer
const {factureAdded, factureReceived, factureRequested, factureUpdated,
    factureRequestFailed, showItemTranche, resetConnectedFactures} = factureSlice.actions


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

export const getConnectedFacturesReset = () => dispatch => {
    dispatch(resetConnectedFactures())
}