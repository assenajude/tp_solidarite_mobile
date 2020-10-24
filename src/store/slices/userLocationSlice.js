import {createSlice} from '@reduxjs/toolkit'
import {apiRequest} from "../actionsCreators/apiActionCreator";

const userLocationSlice = createSlice({
    name: 'userLocation',
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {
        userLocationRequested: (state) => {
            state.loading = true
            state.error = null
        },
        userLocationReceived: (state, action) => {
            const data = action.payload
            state.list = data.userLocations
            state.loading = false
            state.error = null
        },
        userLocationRequestFailed: (state, action) => {
            state.error = action.payload
            state.loading = false
            state.error = null
        },

    }
})

export default userLocationSlice.reducer

const {userLocationReceived, userLocationRequested, userLocationRequestFailed} = userLocationSlice.actions


const url = '/commandes/byUser'
export const getUserLocations = () =>apiRequest( {
    url,
    method: 'get',
    onStart: userLocationRequested.type,
    onSuccess: userLocationReceived.type,
    onError: userLocationRequestFailed.type
})