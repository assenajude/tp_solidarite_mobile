import {create} from 'apisauce';

const apiClient = create({
    baseURL: 'http://192.168.1.178:5000/api',
    headers: {
        'Content-Type':'application/json'
    }
});

apiClient.axiosInstance.interceptors.request.use(config => {
    console.log('une requete a ete envoye');
    return config
})



export default apiClient;