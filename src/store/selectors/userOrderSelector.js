import {createSelector} from '@reduxjs/toolkit'

const orderList = state => state.entities.order.list


/*
const itemsByOrder = (list) => {
    let factureItems = {}
    let newItem = {}
    list.forEach(item => {
        newItem = {id: item.id, items: item.CartItems}
        factureItems[item.id] = newItem
    })
    return factureItems
}

export const getFactureItems = createSelector(
    orderList,
    itemsByOrder
)*/


export const getFactureItems = (orderId) => createSelector(
    orderList,
    list => list.find(item => item.id === orderId)
)