import {createSlice} from '@reduxjs/toolkit'
import {apiRequest} from "../actionsCreators/apiActionCreator";

const articleSlice = createSlice({
    name: 'article',
    initialState: {
        availableArticles: [],
        loading: false,
        error: null,
        creditArticles: []
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
        }
    }
});

export default articleSlice.reducer;
const {articlesReceived, articlesRequested, articlesRequestFailed, articleAdded} = articleSlice.actions

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

