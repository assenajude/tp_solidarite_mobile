import {createSelector} from '@reduxjs/toolkit'

const orderList = state => state.entities.order.list
const user = state => state.auth.user

const userOrders = (list, user) => {
    let userOrderList = [];
    if (list.length >= 1 && user) {
        userOrderList = list.filter(item => item.userId === user.id)
    }
    return userOrderList
}

const getUserOrders = createSelector(
    orderList,
    user,
    userOrders
)


const ordersByUser = (list) => {
    let ordersByUser = []
    let locationsByUser = []
    let servicesByUser = []

    if(list.length >= 1) {
        list.forEach(item => {
            if (item.typeCmde === 'e-commerce') {
                ordersByUser.push(item)
            } else if(item.typeCmde === 'e-location'){
                locationsByUser.push(item)
            } else {
                servicesByUser.push(item)
            }
        })
    }
    return {ordersByUser, locationsByUser, servicesByUser}
}

export const getUserData = createSelector(
    getUserOrders,
    ordersByUser
)


const allUserData = (list, user) => {
    let userData = []
    if (user && list.length>0) {
        userData = list.filter(item => item.userId === user.id)
    }
    return userData
}


export const getAllUserOrderData = createSelector(
    orderList,
    user,
    allUserData
)


/*
const orderList = state => state.entities.order.currentUserOrders
const factureList  = state => state.entities.facture.userFactures

const getSolde = (list1, list2, item) => {
    let orderFactureSolde = 0
    const selectedOrder = list1.find(order => order.id === item.id)
    const orderFacture = list2.find(facture => facture.commandeId === selectedOrder.id)
    orderFactureSolde = orderFacture.solde
    return orderFactureSolde
}*/
