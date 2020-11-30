import {createSlice} from "@reduxjs/toolkit";
import {apiRequest} from "../actionsCreators/apiActionCreator";

const profilSlice = createSlice({
    name: 'userProfile',
    initialState: {
       connectedUser: {},
        loading: false,
        error: null,
        avatar: null,
        notifCompter: 1

    },
    reducers: {
        profileRequested: (state, action) => {
          state.loading = true
          state.error = null
        },
        profileRequestFailed: (state, action) => {
          state.loading = false
          state.error = action.payload
        },
        connectedUserData: (state, action) => {
            state.loading = false
            state.error = null
            state.connectedUser = action.payload
        },
        profileAvatar: (state, action) =>{
            state.loading= false
            state.error = null
            state.avatar = action.payload.avatar
        },
        changeAvatar: (state, action) => {
            state.avatar = action.payload.avatar
        },
        saveInfoEdit: (state, action) => {
            state.loading = false
            state.error = null
            state.connectedUser = action.payload
        }
    }
})

export default profilSlice.reducer
const {connectedUserData, profileAvatar, profileRequested,
    profileRequestFailed, changeAvatar, saveInfoEdit} = profilSlice.actions


const url = '/users/me'

export const getUserProfileAvatar = () => apiRequest({
    url: url+'/avatar',
    method: 'get',
    onStart: profileRequested.type,
    onSuccess: profileAvatar.type,
    onError: profileRequestFailed.type

})

export const getConnectedUserData = () => apiRequest({
    url,
    method: 'get',
    onStart: profileRequested.type,
    onSuccess: connectedUserData.type,
    onError: profileRequestFailed.type

})

export const getAvatarChange = (image) => apiRequest({
    url:url+'/avatar',
    data: image,
    method: 'patch',
    onStart: profileRequested.type,
    onSuccess: changeAvatar.type,
    onError: profileRequestFailed.type
})


export const getSaveEditInfo = (data) => apiRequest({
    url: url+'/update',
    data,
    method: 'patch',
    onStart: profileRequested.type,
    onSuccess: saveInfoEdit.type,
    onError: profileRequestFailed.type
})
