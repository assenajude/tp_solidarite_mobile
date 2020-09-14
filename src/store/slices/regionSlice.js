import {createSlice} from "@reduxjs/toolkit";
import {apiRequest} from "../actionsCreators/apiActionCreator";


const regionSlice = createSlice({
    name: 'region',
    initialState: {
        list: [],
        loading: false,
        error: '',
        regionVilles: [],
    },
    reducers: {
        regionRequested: (state, action) => {
            state.loading = true
        },
        regionReceived: (state, action) => {
            state.loading = false;
            state.list = action.payload
        },
        regionRequestFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        regionAdded: (state, action) => {
            state.list.push(action.payload)
        },
        selestedRegion: (state, action) => {
            let selectedRegion = state.list.filter(region => region.id === action.payload);
            if (selectedRegion[0].villes) {
                state.regionVilles = selectedRegion[0].villes
            }
        }
    }
})

export default regionSlice.reducer;

const {regionReceived, regionRequested, regionRequestFailed, regionAdded, selestedRegion} = regionSlice.actions

const url = '/regions'

export const addRegion = (region) => apiRequest({
  url,
    method: 'post',
    data: region,
    onStart: regionRequested.type,
    onSuccess: regionAdded.type,
    onError: regionRequestFailed.type
});

export const getRegions = () => apiRequest({
    url,
    method: 'get',
    onStart:regionRequested.type,
    onSuccess: regionReceived.type,
    onError: regionRequestFailed.type
});

export const getSelectedRegion = (idRegion) => dispatch => {
    dispatch(selestedRegion(idRegion))
}