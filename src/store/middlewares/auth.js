import apiClient from "../../api/http-common";
import * as authActions from '../actionsCreators/authApiActionCreator';
import authStorage from '../persistStorage'

const authApi = ({dispatch, getState}) => next => async action => {
    if (action.type !== authActions.authApiRequest.type) return next(action);
    const {url, method, data, onStart, onSuccess, onError} = action.payload;
    if (onStart) dispatch({type: onStart});
    next(action)
        try {
            const response = await apiClient.axiosInstance.request({
                url,
                method,
                data,
            })
            if(url === '/auth/signin') {
                dispatch(authActions.authApiSuccess(response.data))
                if (onSuccess) dispatch({type: onSuccess, payload: response.data})
                await authStorage.storeToken(response.data.accessToken)
                //console.log(response.data);
            } else return response

        } catch (e) {
        if (url === '/auth/signin') {
            dispatch(authActions.authApiFailed(e.message))
            if (onError) dispatch({type: onError, payload: e.message})
        } else return e.message

        }


}

export default authApi