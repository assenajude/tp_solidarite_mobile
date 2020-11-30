import {createSlice} from '@reduxjs/toolkit'
import {apiRequest} from "../actionsCreators/apiActionCreator";

const articleSlice = createSlice({
    name: 'article',
    initialState: {
        availableArticles: [],
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
        }
    }
});

export default articleSlice.reducer;
const {articlesReceived, articlesRequested, articlesRequestFailed,
    articleAdded, articleEditSuccess} = articleSlice.actions

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
