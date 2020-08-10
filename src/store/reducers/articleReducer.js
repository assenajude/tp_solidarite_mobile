import {ADD_ARTICLE, SET_ARTICLES} from "../actions/articleActions";

const initialState = {
    availableArticles: [],
    creditArticles: []
};

export default (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_ARTICLES:
            newState = {
                ...state,
                availableArticles: action.articles
            }
            return newState || state
        case ADD_ARTICLE:
            newState = {
                ...state,
                availableArticles: [...state.availableArticles, action.article]

            }
            return newState || state

        default:
            return state
    }
}