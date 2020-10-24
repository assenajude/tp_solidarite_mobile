import {createSelector} from "@reduxjs/toolkit";

const articles = state => state.entities.article.availableArticles
const locations = state => state.entities.location.list


const allData = (listArticles, listLocations) => {
    let dataTab = []
    if(listLocations && listArticles) {
        dataTab = listArticles.concat(listLocations)
        dataTab.sort((a, b) => {
            if(b.createdAt < a.createdAt) return -1
            if(b.createdAt > a.createdAt) return 1
            return 0
        })
    }

    return dataTab
}

export const getAllData = createSelector(
    articles,
    locations,
    allData
)