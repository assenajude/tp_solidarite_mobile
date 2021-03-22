import {createSlice} from "@reduxjs/toolkit";
import {apiRequest} from "../actionsCreators/apiActionCreator";

const parrainageSlice = createSlice({
    name: 'parrainage',
    initialState: {
        loading: false,
        error: null,
        comptes: [],
        list : [],
        userParrains: [],
        userFilleuls: [],
        parrainageState: {},
        searchCompteList: [],
        parrainageOrders: []
    },
    reducers: {
        parrainageRequested: (state, action) => {
            state.loading = true
            state.error = null
        },
        parrainCompteReceived: (state, action) => {
            state.error = null
            state.loading = false
            const allComptes = action.payload
            allComptes.forEach(compte => {
                const soldeCpte = compte.initial + compte.gain - compte.depense-compte.quotite
                compte.solde = soldeCpte

            })
            state.comptes = allComptes
        },
        parrainCompteAdded: (state, action) => {
            state.error = null
            state.loading = false
            let newCompte = action.payload
            const soldeCpte = newCompte.initial + newCompte.gain - newCompte.depense-newCompte.quotite
            newCompte.solde = soldeCpte
            const currentParrainsComptes = state.comptes
            currentParrainsComptes.push(newCompte)
            state.comptes = currentParrainsComptes
        },
        parrainageRequestFailed: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        allParrainageCompteReceived: (state, action) => {
            state.error = null
            state.loading = false
            const receiveds = action.payload
            state.list = receiveds
            state.searchCompteList = receiveds
        },
        compteParrainEdited: (state, action) => {
          state.error = null
            state.loading = false
            const result = action.payload
            const soldeCpte = result.initial + result.gain - result.depense-result.quotite
            let selectedCompte = state.comptes.find(cpte => cpte.id ===result.id)
            selectedCompte.initial = result.initial
            selectedCompte.depense = result.depense
            selectedCompte.quotite = result.quotite
            selectedCompte.gain = result.gain
            selectedCompte.active  = result.active
            selectedCompte.compteState = result.compteState
            selectedCompte.solde = soldeCpte
        },
        resetParrainCompte: (state, action) => {
            state.loading = false
            state.error = null
            state.comptes = []
            state.list  = []
            state.userParrains = []
            state.userFilleuls = []
            state.searchCompteList = []
        },
        showParrainDetials : (state, action) => {
            let selectedCompte = state.searchCompteList.find(compte => compte.id === action.payload.id)
            selectedCompte.showDetails = !selectedCompte.showDetails
        },
        searchParrain: (state, action) => {
            const searchTerme = action.payload
            const currentList = state.list
            if(searchTerme.length === 0) {
                state.searchCompteList = currentList
            } else {
                const filteredList = currentList.filter(compte => {
                    const searchString = compte.User.username+' '+compte.User.nom+' '+compte.User.prenom+' '+compte.User.email
                    const normalizeInfos = searchString.toLowerCase()
                    const normalizeTerme = searchTerme.toLowerCase()
                    if(normalizeInfos.search(normalizeTerme) !== -1) return true
                })
                state.searchCompteList = filteredList
            }
        },
        parrainsReceived: (state, action) => {
            state.error = null
            state.loading = false
                const parrainageData = action.payload
            state.userParrains = parrainageData.parrains
            state.userFilleuls = parrainageData.filleuls
            state.parrainageState = parrainageData.parrainageState
        },
        editQuotite :(state, action) => {
            let selectedCompte = state.comptes.find(compte => compte.id === action.payload.id)
            selectedCompte.editQuotite = !selectedCompte.editQuotite
        },
        editInitial: (state, action) => {
            let selectedCompte = state.comptes.find(compte => compte.id === action.payload.id)
            selectedCompte.editInitial = !selectedCompte.editInitial
        },
        parrainageResponseEdited: (state, action) => {
            let selectedCompte = state.searchCompteList.find(cpte => cpte.id === action.payload.id)
            selectedCompte.editResponse = !selectedCompte.editResponse
        },
        parrainageStopped: (state, action) => {
            state.loading = false
            state.error = null
            const stoppedCompte = action.payload
            let inList = state.list.find(cpt => cpt.id === stoppedCompte.id)
            let inSearchList = state.searchCompteList.find(cpt => cpt.id === stoppedCompte.id)
        },
        parrainageOrders: (state, action) => {
            state.error = null
            state.loading = false
            state.parrainageOrders = action.payload
        },
        selectedParrain: (state, action) => {
            let selectedParrainCompte = state.userParrains.find(compte => compte.id === action.payload.id)
            selectedParrainCompte.selected = !selectedParrainCompte.selected
        },
        showQuotiteEditer: (state, action) => {
            let selectedCompte = state.userParrains.find(cpt => cpt.id === action.payload.id)
            selectedCompte.showQuotiteEdit = action.payload.showQuotiteEdit
            selectedCompte.parrainAction = action.payload.parrainAction
            const oldQuotite = selectedCompte.quotite
            const newQuotite = action.payload.parrainAction
            const resteQuotite = newQuotite>0?oldQuotite-newQuotite:oldQuotite
            selectedCompte.resteQuotite = resteQuotite
        }

    }
})

export default parrainageSlice.reducer
const {parrainageRequested, parrainageRequestFailed, parrainCompteReceived,
    allParrainageCompteReceived, resetParrainCompte, showParrainDetials,
    searchParrain, parrainsReceived, editInitial, editQuotite, compteParrainEdited,
    parrainCompteAdded, parrainageResponseEdited, parrainageStopped, parrainageOrders,
    selectedParrain, showQuotiteEditer} = parrainageSlice.actions

const url = '/compteParrainages'

export const getAllParrains = () => apiRequest({
    url,
    method: 'get',
    onStart: parrainageRequested.type,
    onSuccess: allParrainageCompteReceived.type,
    onError: parrainageRequestFailed.type
})

export const getUserParrainageCompte = (userData) => apiRequest({
    url: url+'/userCompte',
    data:userData,
    method: 'post',
    onStart: parrainageRequested.type,
    onSuccess: parrainCompteReceived.type,
    onError: parrainageRequestFailed.type
})

export const createParrainageCompte = (data) => apiRequest({
    url,
    data,
    method: 'post',
    onStart: parrainageRequested.type,
    onSuccess: parrainCompteAdded.type,
    onError: parrainageRequestFailed.type
})

export const getInitialEdit = (data) => apiRequest({
    url:url+'/editInitial',
    data,
    method: 'patch',
    onStart: parrainageRequested.type,
    onSuccess: compteParrainEdited.type,
    onError: parrainageRequestFailed.type
})

export const getCompteParrainActivate = (data) => apiRequest({
    url:url+'/activeCompte',
    data,
    method: 'patch',
    onStart: parrainageRequested.type,
    onSuccess: compteParrainEdited.type,
    onError: parrainageRequestFailed.type
})

export const getEditQuotiteSave =(data) => apiRequest({
    url:url+'/editQuotite',
    data,
    method: 'patch',
    onStart: parrainageRequested.type,
    onSuccess: compteParrainEdited.type,
    onError: parrainageRequestFailed.type
})

export const getUserParrains = (data) => apiRequest({
    url: url+'/parrainageData',
    method: 'post',
    data,
    onStart: parrainageRequested.type,
    onSuccess: parrainsReceived.type,
    onError: parrainageRequestFailed.type
})

export const getParrainageResponseSend = (data) => apiRequest({
    url: url+'/parrainageResponse',
    data,
    method: 'patch',
    onStart: parrainageRequested.type,
    onSuccess: allParrainageCompteReceived.type,
    onError: parrainageRequestFailed.type
})

export const getStopParrainage = (data) =>apiRequest({
    url:url+'/stopParrainage',
    data,
    method: 'patch',
    onStart: parrainageRequested.type,
    onSuccess: allParrainageCompteReceived.type,
    onError: parrainageRequestFailed.type

})

export const getParrainageOrders =(data)=> apiRequest({
    url: url + '/parrainageOrders',
    data,
    method: 'post',
    onStart: parrainageRequested.type,
    onSuccess: parrainageOrders.type,
    onError: parrainageRequestFailed.type
})

export const getCompteParrainReset = () => dispatch => {
    dispatch(resetParrainCompte())
}

export const getParrainCompteDetails = (compte) => dispatch => {
    dispatch(showParrainDetials(compte))
}

export const getSearchCompteParrain = (compteInfos) => dispatch => {
    dispatch(searchParrain(compteInfos))
}

export const getStartQuotiteEdit = (compte) => dispatch => {
    dispatch(editQuotite(compte))
}

export const getStartInitialEdit = (compte) => dispatch => {
    dispatch(editInitial(compte))
}

export const getParrainageResponseEdit = (compte) => dispatch => {
    dispatch(parrainageResponseEdited(compte))
}

export const getSelectedParrain = (compte) => dispatch => {
    dispatch(selectedParrain(compte))
}

export const getQuotiteEditShown = (compte) => dispatch => {
    dispatch(showQuotiteEditer(compte))
}