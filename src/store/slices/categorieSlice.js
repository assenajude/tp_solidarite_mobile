import {createSlice} from '@reduxjs/toolkit';
import {apiRequest} from '../actionsCreators/apiActionCreator'


const categorieSlice = createSlice({
    name: 'categorie',
    initialState: {
        list: [],
        loading: false
    },
    reducers: {
        categoriesRequested: (state, action) => {
          state.loading = true
        },
        categoriesReceived: (state, action) => {
            state.list = action.payload;
            state.loading = false
        },
        categoriesRequestFailed: (state, action) => {
            state.loading = false
        },
        categorieAdded: (state, action) => {
            state.list.push(action.payload);
            state.loading = false
        }
    }

});

export default categorieSlice.reducer;
const {categoriesReceived, categoriesRequested, categoriesRequestFailed, categorieAdded} = categorieSlice.actions

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