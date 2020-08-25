import apiClient from "./http-common";

const articleEndpoint = '/articles';

const getArticles = () => apiClient.get(articleEndpoint);

const createArticle = (article) => {
    /*const filename = article.articleImage.split('/').pop();

    let articleData = new FormData();
    articleData.append('categorieId', article.idCategorie);
    articleData.append('code', article.code);
    articleData.append('aide', article.aide);
    articleData.append('designation',article.designation);
    articleData.append('quantite',article.quantite);
    articleData.append('prix',article.prix);
    articleData.append('description', article.description);
    articleData.append('image', {
        name: filename,
        type: 'image/jpeg',
        uri: article.articleImage
    })*/

    return apiClient.post(articleEndpoint, articleData)
}

export default {
    getArticles,
    createArticle
}

