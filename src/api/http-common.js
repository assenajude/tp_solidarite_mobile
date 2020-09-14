import {create} from 'apisauce';
import authStorage from '../store/persistStorage'

const apiClient = create({
    baseURL: 'http://192.168.1.178:5000/api',
    headers: {
        'Content-Type':'multipart/form-data',
         Accept: 'application/json'
    }
});

apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = await authStorage.getStoredToken();
    if (!authToken) return;
    request.headers['x-access-token'] = authToken
})

apiClient.axiosInstance.interceptors.request.use(config => {
    console.log('une requete a ete envoye');
    return config
})



export default apiClient;