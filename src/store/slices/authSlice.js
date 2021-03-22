import {createSlice} from '@reduxjs/toolkit'
import decode from 'jwt-decode'
import authStorage from '../persistStorage'
import {apiRequest} from "../actionsCreators/apiActionCreator";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        loading: false,
        isLoggedIn: false,
        error: null,
        success: false
    },
    reducers:{
        authRequested: (state, action) => {
            state.loading = true;
            state.error = null
            state.isLoggedIn = false
        },
        authSuccess: (state, action) => {
           const newUser = decode(action.payload.accessToken)
            state.user = newUser;
            state.isLoggedIn = true;
            state.loading = false;
        },
        autoLogin: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.loading = false;
        },
        registerSucccess: (state, action) => {
            state.loading = false;
            state.succcess = true
            state.error = null
        },
        authFailed: (state, action) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.error = action.payload
        },
        logout: (state) =>{
                state.user = {}
                state.isLoggedIn = false
                state.loading = false
                state.error = null
        },
        changeAvatar: (state, action) => {
            state.user.avatar = action.payload.avatar
            state.loading = false
            state.error = null
        },
        profileAvatar: (state, action) =>{
            state.user.avatar = action.payload.avatar
            state.loading= false
            state.error = null
        },
        resetLogin: (state) => {
            state.loading = false
            state.error = null
        },
        pieceUpdated: (state, action) => {
            state.error = null
            state.loading = false
            const pieceArray = action.payload
            state.user.pieceIdentite = pieceArray
        }

    }
})

export default authSlice.reducer
const {authFailed, authRequested, authSuccess, autoLogin, logout, changeAvatar, profileAvatar,
    registerSucccess, resetLogin, pieceUpdated} = authSlice.actions


 //action creators

const signupUrl = '/auth/signup';
const loginUrl = '/auth/signin'



export const signin = (user) => apiRequest({
    url: loginUrl,
    method: 'post',
    data: user,
    onStart: authRequested.type,
    onSuccess: authSuccess.type,
    onError: authFailed.type
})

export const register = (user) => apiRequest({
    url: signupUrl,
    method: 'post',
    data: user,
    onStart: authRequested.type,
    onSuccess: registerSucccess.type,
    onError: authFailed.type
})

export const getAutoLogin = (user) => dispatch => {
    dispatch(autoLogin(user))
}

export const getLogout = () => dispatch => {
    dispatch(logout())
    authStorage.removeToken()
}
const avatarUrl = '/users/me'
export const getAvatarChange = (data) => apiRequest({
    url:avatarUrl+'/avatar',
    data,
    method: 'patch',
    onStart: authRequested.type,
    onSuccess: changeAvatar.type,
    onError: authFailed.type
})

export const getUserProfileAvatar = () => apiRequest({
    url: avatarUrl+'/avatar',
    method: 'get',
    onStart: authRequested.type,
    onSuccess: profileAvatar.type,
    onError: authFailed.type

})

export const getUserPieceUpdate = (data) =>apiRequest({
    url: avatarUrl+'/piece',
    data,
    method: 'patch',
    onStart: authRequested.type,
    onSuccess: pieceUpdated.type,
    onError: authFailed.type
})

export const getLoginReset = () => dispatch => {
    dispatch(resetLogin())
}
