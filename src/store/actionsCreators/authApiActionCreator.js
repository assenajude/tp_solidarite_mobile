import {createAction} from "@reduxjs/toolkit";


export const authApiRequest = createAction('api/authRequest')
export const authApiSuccess = createAction('api/authSuccess/')
export const authApiFailed= createAction('api/authFailed')