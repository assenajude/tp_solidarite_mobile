import {createSlice} from "@reduxjs/toolkit";
import {apiRequest} from "../actionsCreators/apiActionCreator";

const villeSlice = createSlice({
    name: 'ville',
    initialState: {
        list: [],
        loading: false,
        error: null,
        villeRelais: [],
        selectedVille: {},
        userVille: {}
    },
    reducers: {
        villeRequested: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        villeReceived: (state, action) => {
            state.loading = false;
            state.error = null;
            state.list = action.payload
        },
        villeAdded: (state, action) => {
            state.loading = false;
            state.error = null;
            state.list.push(action.payload)
        },
        villeRequestFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        getVilleRelais: (state, action) => {
            /*const relais = state.list.filter(ville => ville.nom === action.payload);
            const villeRelais = relais[0].pointRelais;*/
            const selectedVille = state.list.find(ville => ville.nom === action.payload);
            state.selectedVille = selectedVille
                state.villeRelais = selectedVille.pointRelais

        },
        getLivraisonVille: (state, action) => {
            const selectedVille = state.list.find(ville => ville.id === action.payload);
            state.userVille = selectedVille
        }
    }
});

export default villeSlice.reducer;

const {villeAdded, villeReceived, villeRequested, villeRequestFailed, getVilleRelais, getLivraisonVille} = villeSlice.actions


const url = '/villes'

export const saveVille = (ville) => apiRequest({
    url,
    method: 'post',
    data: ville,
    onStart: villeRequested.type,
    onSuccess: villeAdded.type,
    onError: villeRequestFailed.type
})

export const getAllVilles = () => apiRequest({
    url,
    method: 'get',
    onStart: villeRequested.type,
    onSuccess: villeReceived.type,
    onError: villeRequestFailed.type

})

export const selectedVilleRelais = (ville) => dispatch => {
    dispatch(getVilleRelais(ville))
}

export const getSelectedLivraisonVille = (villeId) => dispatch => {
    dispatch(getLivraisonVille(villeId))
}