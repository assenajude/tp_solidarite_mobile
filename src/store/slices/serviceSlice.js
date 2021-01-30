import {createSlice} from "@reduxjs/toolkit";
import {apiRequest} from "../actionsCreators/apiActionCreator";

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
      loading: false,
      list: [],
        searchList: [],
      error: null,
        serviceRefresh: 0,
       refreshLoading: false
    },
    reducers: {
        serviceRequested: (state) =>{
            state.loading = true
            state.error = null
        },
        startingRefresh: (state, action) => {
            state.refreshLoading = true
            state.error = null
        },
        serviceReceived: (state, action) => {
            state.list = action.payload
            state.searchList = action.payload
            state.error = null
            state.loading = false
            state.refreshLoading = false
            state.serviceRefresh = 0
        },
        serviceRequestFailed:(state, action) => {
            state.loading = false
            state.error = action.payload
        },
        serviceAdded: (state, action)=> {
            state.list.push(action.payload)
            state.searchList.unshift(action.payload)
            state.serviceRefresh ++
            state.loading = false
            state.error = null
        },
        searchService: (state, action) => {
            const searchLabel = action.payload.toLowerCase()
            const currentList = state.list
            if(searchLabel.length === 0 ) {
                state.searchList = currentList
            } else {
                const filteredList = currentList.filter(service => {
                    const searchString = service.libelle+' '+service.description
                    const normalizedString = searchString.toLowerCase()
                    if(normalizedString.search(searchLabel) !== -1) return true
                })
                state.searchList = filteredList
            }
        }
    }
})


const {serviceAdded, serviceReceived, serviceRequested, serviceRequestFailed, startingRefresh, searchService} = serviceSlice.actions
export default serviceSlice.reducer

const url = '/services'

export const getServices = () => apiRequest({
    url,
    method: 'get',
    onStart: serviceRequested.type,
    onSuccess: serviceReceived.type,
    onError: serviceRequestFailed.type
})

export const addService = (service) => apiRequest({
    url,
    method: 'post',
    data: service,
    onStart: serviceRequested.type,
    onSuccess: serviceAdded.type,
    onError:serviceRequestFailed.type
})

export const getServiceRefreshed = () => apiRequest({
    url,
    method: 'get',
    onStart: startingRefresh.type,
    onSuccess: serviceReceived.type,
    onError: serviceRequestFailed.type
})

export const getSearchService = (service) => dispatch => {
    dispatch(searchService(service))
}