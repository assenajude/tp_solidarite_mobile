import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import categorieService from "../../api/categorieService";

export const apiRequest = createAction('api/request')
export const apiRequestSuccess  = createAction('api/requestSuccess');
export const apiRequestFailed = createAction('api/requestFailed');
