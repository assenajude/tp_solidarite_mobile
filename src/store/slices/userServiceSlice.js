import {createSlice} from '@reduxjs/toolkit'
import {apiRequest} from "../actionsCreators/apiActionCreator";

const userServiceSlice = createSlice({
    name: 'userService',
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {
        userServiceRequested: (state) => {
            state.error = null
            state.loading = false
        },
        userServiceRequestFailed : (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        userServiceReceived: (state, action) => {
             const data = action.payload
            state.list = data.userServices
            state.error = null
            state.loading = false
        },
    }
})

export default userServiceSlice.reducer
const {userServiceReceived, userServiceRequested, userServiceRequestFailed} = userServiceSlice.actions


const url = '/commandes'
export const getUserServices = () => apiRequest( {
    url: url+'/byUser',
    method: 'get',
    onStart: userServiceRequested.type,
    onSuccess: userServiceReceived.type,
    onError: userServiceRequestFailed.type
})
