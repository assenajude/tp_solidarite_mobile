import {createSlice} from "@reduxjs/toolkit";
import {apiRequest} from "../actionsCreators/apiActionCreator";

const userAdresseSlice = createSlice({
    name: 'userAdresse',
    initialState: {
        list: [],
        loading: false,
        error: null,
        userAdresses: [],
        selectedAdresse: {},
        adresseRelais: {}
    },
    reducers: {
        userAdresseRequested: (state, action) => {
            state.loading = true
        },
        userAdresseReceived: (state, action) => {
            state.loading = false
            state.list = action.payload
            state.error = null
        },
        userAdresseFailed: (state, action)=> {
            state.loading = false
            state.error = action.payload
        },
        userAdresseAdded: (state, action) => {
            state.loading = false;
            state.error = null;
            state.list.push(action.payload)
        },
        adressByUser: (state, action) => {
            const adressesByUser = state.list.filter(adresse => adresse.userId === action.payload);
            state.userAdresses = adressesByUser
        },
        selectAdress: (state, action) => {
            const selectAdress = state.userAdresses.find(adress => adress.id === action.payload);
            state.selectedAdresse  = selectAdress;
            if (selectAdress.selected) {
            selectAdress.selected = false
            } else {
                selectAdress.selected = true
            };
            state.adresseRelais = selectAdress.pointRelai;
            const otherAdress = state.userAdresses.filter(adress => adress.id !== selectAdress.id);
            otherAdress.forEach(adress => adress.selected = false)

        },
        resetAdresse: (state) => {
            state.adresseRelais = {}
            state.selectedAdresse = {}
            state.userAdresses.forEach(adresse => {
                adresse.selected = false
            })
        }
    }

})

export default userAdresseSlice.reducer;

const {userAdresseAdded, resetAdresse, userAdresseFailed, userAdresseReceived, userAdresseRequested, adressByUser, selectAdress} = userAdresseSlice.actions


const url = '/userAdresses'

export const saveAdresse = (adresse) => apiRequest({
    url,
    method: 'post',
    data: adresse,
    onStart: userAdresseRequested.type,
    onSuccess: userAdresseAdded.type,
    onError: userAdresseFailed.type
})

export const getAdresse = () => apiRequest({
    url,
    method: 'get',
    onStart: userAdresseRequested.type,
    onSuccess: userAdresseReceived.type,
    onError: userAdresseFailed.type

})

export const getAdresseByUser = (userId) => dispatch => {
    dispatch(adressByUser(userId))
}

export const getSelectedAdress = (adressId) => dispatch => {
    dispatch(selectAdress(adressId))
}

export const getAdresseReset = () => dispatch => {
    dispatch(resetAdresse())
}