import {createSlice} from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        availableLocation: [],
        userLocations: []
    },
    reducers: {

    }
});

export default locationSlice.reducer
