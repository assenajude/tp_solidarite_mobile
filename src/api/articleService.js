import apiClient from "./http-common";

const articleEndpoint = '/articles';

const getArticles = () => apiClient.get(articleEndpoint);

const createArticle = (article) => {
    const filename = article.articleImage.split('/').pop();

    let articleData = new FormData();
    articleData.append('categorieId', article.categorieId);
    articleData.append('designation',article.designation);
    articleData.append('description', article.description);
    articleData.append('image', {
        name: filename,
        type: 'image/jpeg',
        uri: article.articleImage
    })

    return apiClient.post(articleEndpoint, articleData)
}

export default {
    getArticles,
    createArticle
}

