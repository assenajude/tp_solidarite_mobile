import {createSlice} from '@reduxjs/toolkit'
import {apiRequest} from "../actionsCreators/apiActionCreator";
import {authApiRequest} from '../actionsCreators/authApiActionCreator'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        roles: [],
        token: null,
        info: '',
        user: null,
        isLoggedIn: false,
        loading: false,
        error: null
    },
    reducers:{
        authRequested: (state, action) => {
            state.isLoggedIn = false;
            state.loading = true;
            state.error = null
        },
        authSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            state.roles = action.payload.roles
        },
        registerSucccess: (state, action) => {
            state.info = action.payload;
            state.loading = false;
            state.isLoggedIn = false
        },
        authFailed: (state, action) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.error = action.payload
        },
    }
})

export default authSlice.reducer
const {authFailed, authRequested, authSuccess, registerSucccess} = authSlice.actions


 //action creators

const signupUrl = '/auth/signup';
const loginUrl = '/auth/signin'



export const signin = (user) => async dispatch => {
    dispatch (authApiRequest({
        url: loginUrl,
        method: 'post',
        data: user,
        onStart: authRequested.type,
        onSuccess: authSuccess.type,
        onError: authFailed.type
    }))
}

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
