import {createSlice} from "@reduxjs/toolkit";
import {apiRequest} from "../actionsCreators/apiActionCreator";

const mainSlice = createSlice({
    name: 'main',
    initialState: {
        list: [],
        loading: false,
        error: null,
        refresh: false
    },
    reducers: {
        mainRequested: (state) =>{
            state.loading = true
        },
        mainRequestFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        mainReceived: (state, action) => {
            state.loading = false
            state.refresh = false
            state.error = null
            state.list = action.payload
        },
        addNewItem:(state, action) => {
            state.list.push(action.payload)
        },
        startRefresh: (state, action) => {
            state.refresh = true
        }
    }
})

const {mainReceived, mainRequested, mainRequestFailed, addNewItem, startRefresh} = mainSlice.actions
export default mainSlice.reducer

const url = '/mainDatas'
export const getAllMainData = () => apiRequest({
    url,
    method: 'get',
    onStart: mainRequested.type,
    onSuccess: mainReceived.type,
    onError: mainRequestFailed.type

})

export const getRefreshing = () => apiRequest( {
    url,
    method: 'get',
    onStart: startRefresh.type,
    onSuccess: mainReceived.type,
    onError: mainRequestFailed.type

})


export const addItemToMainList = (item) => dispatch => {
    dispatch(addNewItem(item))
}