import apiClient from "./http-common";

const endpoint = '/categories'

const getAllCategories = () => apiClient.get(endpoint);

const addCategorie = (categorie) => apiClient.post(endpoint, {
    libelle: categorie.libelle,
    description: categorie.description,
    type: categorie.type
})


export default {
    getAllCategories,
    addCategorie
}