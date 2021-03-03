import {createSlice} from '@reduxjs/toolkit';
import {apiRequest} from '../actionsCreators/apiActionCreator'


const categorieSlice = createSlice({
    name: 'categorie',
    initialState: {
        list: [],
        loading: false,
        error: null,
        espaceCategories: []
    },
    reducers: {
        categoriesRequested: (state, action) => {
          state.loading = true
            state.error = null
        },
        categoriesReceived: (state, action) => {
            state.list = action.payload;
            state.loading = false
            state.error = null
        },
        categoriesRequestFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        categorieAdded: (state, action) => {
            state.loading = false
            state.error = null
            state.list.push(action.payload);
        },
        espaceSelected: (state, action) => {
            const selectedCategories = state.list.filter(categorie => categorie.EspaceId === action.payload.id)
            state.espaceCategories = selectedCategories

        }
    }

});

export default categorieSlice.reducer;
const {categoriesReceived, categoriesRequested, categoriesRequestFailed,
    categorieAdded, espaceSelected} = categorieSlice.actions

// actions creators

const url = '/categories'

export const loadCategories = () => apiRequest({
    method: 'get',
    url,
    onStart: categoriesRequested.type,
    onSuccess: categoriesReceived.type,
    onError: categoriesRequestFailed.type
})

export const addCategorie = (categorie) => (dispatch) => {
    dispatch (apiRequest({
        url,
        method: 'post',
        data: categorie,
        onStart: categoriesRequested.type,
        onSuccess: categorieAdded.type,
        onError: categoriesRequestFailed.type
    }))
}

export const getSelectedEspace = (espace) => dispatch => {
    dispatch(espaceSelected(espace))
}