import {createSlice} from "@reduxjs/toolkit";
import {apiRequest} from "../actionsCreators/apiActionCreator";

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        list: [],
        loading: true,
        addSuccess: false,
        error: null,
        newAdded: {},
        availableLocation: [],
        userLocations: []
    },
    reducers: {
        locationRequested: (state) => {
            state.loading = true
            state.error = null
        },
        locationReceived: (state, action) => {
            state.loading = false
            state.error = null
            state.list = action.payload
        },
        locationRequestFailed: (state, action) => {
            state.loading = false
            state.addSuccess = false
            state.error = action.payload
        },
        locationAdded: (state, action)=> {
            state.loading = false
            state.addSuccess = true
            state.list.push(action.payload)
            state.newAdded = action.payload
        },
        userLocations: (state, action) => {
        const userLocation = state.list.filter(location => location.userId === action.payload.id)
            state.userLocations = userLocation
        }

    }
});

const {locationAdded, locationReceived, locationRequested, locationRequestFailed} = locationSlice.actions
export default locationSlice.reducer


const url = '/locations'
export const getAllLocation = () => apiRequest({
    url,
    method: 'get',
    onStart: locationRequested.type,
    onSuccess: locationReceived.type,
    onError: locationRequestFailed.type

})

export const addLocation = (location) => apiRequest({
    url,
    method: 'post',
    data: location,
    onStart: locationRequested.type,
    onSuccess: locationAdded.type,
    onError: locationRequestFailed.type
})