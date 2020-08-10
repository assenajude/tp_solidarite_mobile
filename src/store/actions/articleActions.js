import articleService from '../../api/articleService'

export const SET_ARTICLES = 'SET_ARTICLES';
export const ADD_ARTICLE = 'ADD_ARTICLE';

export const getArticles = () => {
    return async dispatch => {
        try {
            const response = await articleService.getArticles();
            if (!response.ok) {
                throw new Error('une erreur inatendue...')
            }
            dispatch({
                type: SET_ARTICLES, articles: response.data
            })
        } catch (error) {
            throw new Error(error)
        }

    }

};

export const createArticle = (article) => {
    return async (dispatch) => {
        const resultat = await articleService.createArticle(article);
        if (!resultat.ok) throw new Error(resultat.problem)
        console.log(resultat.data)
        dispatch({
            type: ADD_ARTICLE,
            article: resultat.data
        })
    }
}