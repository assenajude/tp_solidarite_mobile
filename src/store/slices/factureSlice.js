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
            state.userFactures = action.payload
            let factureRatio = 0
            state.userFactures.forEach(facture => {
                factureRatio = facture.solde/facture.montant
                factureRatio.toFixed(2)
                facture.ratio = Number(factureRatio)
            })
        },

        orderFacture: (state, action) => {
          const selectedOrderFacture = state.userFactures(item => item.commandeId === action.payload.id)
            state.orderFacture = selectedOrderFacture
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
        changePayedStatus: (state, action) => {
            let facturesTranches = []
            let selectedTranche = {}
            let selectedRatio = 0;
            let selectedFacture = state.userFactures.find(facture => facture.id === action.payload.factureId)
            facturesTranches = selectedFacture.tranches
            selectedTranche = facturesTranches.find(tranche =>tranche.id ===action.payload.id)
            selectedFacture.solde += selectedTranche.montant
            selectedRatio = selectedFacture.solde/selectedFacture.montant
            selectedRatio.toFixed(2)
            selectedFacture.ratio = Number(selectedRatio)
            selectedTranche.payed = true
        },
        payeFacture: (state, action) => {
            let selectedFacture = state.userFactures.find(facture => facture.id === action.payload.id)
            let selectedRatio = 0;
            selectedFacture.solde += action.payload.montant
            selectedRatio = selectedFacture.solde/selectedFacture.montant
            selectedRatio.toFixed(2)
            selectedFacture.ratio = Number(selectedRatio)
        }
    }
})

export default factureSlice.reducer
const {factureAdded, factureReceived,orderFacture, factureRequested, payeFacture, changePayedStatus, factureRequestFailed, showItemTranche} = factureSlice.actions


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

export const getPayedStatusChanged = (tranche) =>dispatch => {
    dispatch(changePayedStatus(tranche))
}

export const getFacturePayed = (facture) => apiRequest({
    url: url+'/update',
    method: 'patch',
    data:facture,
    onStart: factureRequested.type,
    onSuccess: payeFacture.type,
    onError: factureRequestFailed.type
})


export const getOrderFature = (order) => dispatch => {
    dispatch(orderFacture(order))
}

export const getFacturesByUser = () => apiRequest({
    url: url+'/byUser',
    method: 'get',
    onStart: factureRequested.type,
    onSuccess:factureReceived.type,
    onError: factureRequestFailed.type
})