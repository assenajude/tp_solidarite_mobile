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
        selectAdress: (state, action) => {
            const selectAdress = state.list.find(adress => adress.id === action.payload);
            state.selectedAdresse  = selectAdress;
            if (selectAdress.selected) {
            selectAdress.selected = false
            } else {
                selectAdress.selected = true
            };
            state.adresseRelais = selectAdress.PointRelai;
            const otherAdress = state.list.filter(adress => adress.id !== selectAdress.id);
            otherAdress.forEach(adress => adress.selected = false)

        },
        resetAdresse: (state) => {
            state.adresseRelais = {}
            state.selectedAdresse = {}
            state.list.forEach(adresse => {
                adresse.selected = false
            })
        }
    }

})

export default userAdresseSlice.reducer;

const {userAdresseAdded, resetAdresse, userAdresseFailed, userAdresseReceived, userAdresseRequested, selectAdress} = userAdresseSlice.actions


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


export const getSelectedAdress = (adressId) => dispatch => {
    dispatch(selectAdress(adressId))
}

export const getAdresseReset = () => dispatch => {
    dispatch(resetAdresse())
}