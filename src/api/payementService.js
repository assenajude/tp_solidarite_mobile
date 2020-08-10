import apiClient from "./http-common";

const endpoint = '/payements'
const getPayement = () => apiClient.get(endpoint)

const addPayement = (payement) => apiClient.post(endpoint, {
    mode: payement.mode
})

export default {
    getPayement,
    addPayement
}