import {createSlice} from '@reduxjs/toolkit'
import {apiRequest} from "../actionsCreators/apiActionCreator";

const articleSlice = createSlice({
    name: 'article',
    initialState: {
        availableArticles: [],
        searchList: [],
        loading: false,
        error: null,
        creditArticles: [],
    },
    reducers: {
        articlesRequested: (state, action) => {
            state.loading = true
            state.error = null
        },
        articlesReceived: (state, action) => {
            state.availableArticles = action.payload
            state.searchList = action.payload
            state.loading = false
            state.error = null
        },
        articlesRequestFailed: (state, action) => {
            state.loading = false
            state.articleAddedSuccess = false
            state.error = action.payload
        },
        articleAdded: (state, action) => {
            state.availableArticles.push(action.payload)
            state.searchList.unshift(action.payload)
            state.loading = false
            state.articleAddedSuccess = true
        },
        articleEditSuccess: (state, action) => {
            state.loading = false
            state.error = null
            const editIndex = state.findIndex(article => article.id === action.payload.id)
            if(editIndex >= 0) {
            const articleList = state.availableArticles.splice(editIndex, 1, action.payload)
                state.availableArticles = articleList
            }
        },
        searchArticle: (state, action) => {
            const searchTerme = action.payload
            const currentList = state.availableArticles
            if(searchTerme.length === 0) {
                state.searchList = currentList
            } else {
                const filteredList = currentList.filter(article => {
                    const searchString = article.designArticle + ' '+ article.descripArticle
                    const normalizeString = searchString.toLowerCase()
                    const normalizeTerme = searchTerme.toLowerCase()
                    if(normalizeString.search(normalizeTerme) !== -1) return true
                })
                state.searchList = filteredList
            }
        },
        selectedCategoryArticle: (state, action) => {
           if(action.payload === 'all'){
               state.searchList = state.availableArticles
           } else {
            const newList = state.availableArticles.filter(article => article.CategorieId === action.payload.id)
            state.searchList = newList
           }
        }
    }
});

export default articleSlice.reducer;
const {articlesReceived, articlesRequested, articlesRequestFailed,
    articleAdded, articleEditSuccess, searchArticle, selectedCategoryArticle} = articleSlice.actions

const url = '/articles'
export const loadArticles = () => apiRequest({
    url,
    method: 'get',
    onStart: articlesRequested.type,
    onSuccess: articlesReceived.type,
    onError: articlesRequestFailed.type
});

export const saveArticle = (article) =>(dispatch)=> {
    dispatch (
        apiRequest({
        url,
        method: 'post',
        data: article,
        onStart: articlesRequested.type,
        onSuccess: articleAdded.type,
        onError: articlesRequestFailed.type
    })
    )
}

export const saveEditedArticle = (data) => apiRequest({
    url:url+'/update',
    method: 'patch',
    data,
    onStart: articlesRequested.type,
    onSuccess: articleEditSuccess.type,
    onError: articlesRequestFailed.type
})


export const getSearchArticle = (value) => dispatch => {
    dispatch(searchArticle(value))
}

export const getSelectedCategoryArticles = (category) => dispatch => {
    dispatch(selectedCategoryArticle(category))
}