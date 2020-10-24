import {create} from 'apisauce';
import authStorage from '../store/persistStorage'



const apiClient = create({
    baseURL: 'http://192.168.43.223:5000/api',
    headers: {
        'Content-Type':'multipart/form-data',
         Accept: 'application/json'
    }
});

/*apiClient.addAsyncRequestTransform(request => async()=> {
    console.log('starting request transform')
    const authToken = await authStorage.getStoredToken();
    if (!authToken) {
        console.log('aucun token trouvé')
        return;
    }
    console.log(authToken)
    request.headers['x-access-token'] = authToken
})*/

apiClient.axiosInstance.interceptors.request.use(config => {
    console.log('une requete a ete envoye');
    return config
})



export default apiClient;