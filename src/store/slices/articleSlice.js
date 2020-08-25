import {createSlice} from '@reduxjs/toolkit'
import {apiRequest} from "../actionsCreators/apiActionCreator";

const articleSlice = createSlice({
    name: 'article',
    initialState: {
        availableArticles: [],
        loading: false,
        creditArticles: []
    },
    reducers: {
        articlesRequested: (state, action) => {
            state.loading = true
        },
        articlesReceived: (state, action) => {
            state.availableArticles = action.payload
            state.loading = false
        },
        articlesRequestFailed: (state, action) => {
            state.loading = false
        },
        articleAdded: (state, action) => {
            state.availableArticles.push(action.payload)
            state.loading = false
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

