import apiClient from "./http-common";

const endpoint = '/plans';

const getPlans = () => apiClient.get(endpoint);

const createPlan = (plandata) => apiClient.post(endpoint, {
    payementId: plandata.idPayement,
    libelle: plandata.libelle,
    description: plandata.description,
    mensualite: plandata.mensualite,
    compensation: plandata.compensation
})


export default {
    getPlans,
    createPlan
}