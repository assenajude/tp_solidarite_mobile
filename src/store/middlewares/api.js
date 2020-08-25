import apiClient from "../../api/http-common";
import * as actions from '../actionsCreators/apiActionCreator';
import {categoriesRequested} from '../slices/categorieSlice'

const api = ({dispatch}) => next => async action => {
    if (action.type !== actions.apiRequest.type) return next(action);
    const {url, method, data, onStart, onSuccess, onError} = action.payload;
    if (onStart) dispatch({type: onStart})
    next(action);
    try {
        let response;
        if (data) {
            const dataKeys = Object.keys(data)
            if (dataKeys.indexOf('image') !== -1) {
                const filename = data.image.split('/').pop();
                let formData = new FormData();
                for (key in data) {
                    if (key=='image') {
                        formData.append('image', {
                            name: filename,
                            type: 'image/jpeg',
                            uri: data.image
                        })
                    }
                    formData.append(key, data[key])
                }
                response = await apiClient.axiosInstance.request({
                    url,
                    method,
                    data:formData
                })
            } else {
                response = await apiClient.axiosInstance.request({
                    url,
                    method,
                    data
                })
        }

        } else {
            response = await apiClient.axiosInstance.request({
                url,
                method
            })
        }
        dispatch(actions.apiRequestSuccess(response.data))
        if (onSuccess) dispatch({type: onSuccess, payload: response.data});
    } catch (e) {
        dispatch(actions.apiRequestFailed(e.message))
        if (onError) dispatch({type: onError, payload: e.message})

    }
    


}

export default api