import {createSlice} from '@reduxjs/toolkit'
import {authApiRequest} from '../actionsCreators/authApiActionCreator'
import decode from 'jwt-decode'
import authStorage from '../persistStorage'
import {apiRequest} from "../actionsCreators/apiActionCreator";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        isLoggedIn: false,
        error: null
    },
    reducers:{
        authRequested: (state, action) => {
            state.isLoggedIn = false;
            state.loading = true;
            state.error = null
        },
        authSuccess: (state, action) => {
           const newUser = decode(action.payload.accessToken)
            state.user = newUser;
            state.isLoggedIn = true;
            state.loading = false;
        },
        getAutoLogin: (state, action) => {
            state.isLoggedIn = true;
            state.loading = false;
            state.user = action.payload;
        },
        registerSucccess: (state, action) => {
            state.info = action.payload;
            state.loading = false;
            state.isLoggedIn = true
        },
        authFailed: (state, action) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.error = action.payload
        },
        logout: (state) =>{
            state.roles = []
                state.token = null
                state.info = ''
                state.user = null
                state.isLoggedIn = false
                state.loading = false
                state.error = null
        }
    }
})

export default authSlice.reducer
const {authFailed, authRequested, authSuccess, getAutoLogin, logout} = authSlice.actions


 //action creators

const signupUrl = '/auth/signup';
const loginUrl = '/auth/signin'



/*export const signin = (user) => async dispatch => {
    dispatch (authApiRequest({
        url: loginUrl,
        method: 'post',
        data: user,
        onStart: authRequested.type,
        onSuccess: authSuccess.type,
        onError: authFailed.type
    }))
}*/

export const signin = (user) => apiRequest({
    url: loginUrl,
    method: 'post',
    data: user,
    onStart: authRequested.type,
    onSuccess: authSuccess.type,
    onError: authFailed.type
})

export const register = (user) => async dispatch=> {
        const result = await dispatch(authApiRequest({
            url: signupUrl,
            method: 'post',
            data: user,
        }));
        if (result.status === 201) {
            dispatch(signin(user))
        } else dispatch(authFailed(result))

}

export const autoLogin = (user) => dispatch => {
    dispatch(getAutoLogin(user))
}

export const getLogout = () => dispatch => {
    dispatch(logout())
    authStorage.removeToken()
}