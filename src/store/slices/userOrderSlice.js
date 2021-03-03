import {createSlice} from '@reduxjs/toolkit'
import {apiRequest} from "../actionsCreators/apiActionCreator";


const userOrderSlice = createSlice({
    name: 'userOrder',
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {
        userOrderRequested: (state) => {
            state.loading = true
            state.error = null
        },
        userOrderReceived: (state, action) => {
            const data = action.payload
            state.list = data.userCommandes
            state.loading = false
            state.error = null
        },
        userOrderRequestFailed: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }

})


export default userOrderSlice.reducer
const {userOrderReceived, userOrderRequested, userOrderRequestFailed} = userOrderSlice.actions

const url = '/commandes/byUser'

export const getUserOrders = () => apiRequest({
    url,
    method: 'get',
    onStart: userOrderRequested.type,
    onSuccess: userOrderReceived.type,
    onError: userOrderRequestFailed.type
})
