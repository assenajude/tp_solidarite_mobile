import {createSelector} from '@reduxjs/toolkit'

const orderList = state => state.entities.order.list

const itemsByOrder = (list) => {
    let factureItems = {}
    let newItem = {}
    list.forEach(item => {
        newItem = {id: item.id, items: item.cartItems}
        factureItems[item.id] = newItem
    })
    return factureItems
}

export const getFactureItems = createSelector(
    orderList,
    itemsByOrder
)