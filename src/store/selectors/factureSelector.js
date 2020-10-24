import {createSelector} from '@reduxjs/toolkit'

const userId = state => state.auth.user.id
const  orders= state => state.entities.order.list
const factures = state => state.entities.facture.list


const userOrders = (list, userId) => {
    let userOrdersTab = []
    if(list.length >= 1 && userId) {
    const userOrders = list.filter(order => order.userId === userId)
     userOrdersTab = userOrders
    }
    return userOrdersTab
}


export const getUserOrders = createSelector(
    orders,
    userId,
    userOrders
)


const userFactures = (facturesList, orderList) => {
    let facturesTab = []
    facturesList.forEach(facture => {
        const indexOfFacture = orderList.findIndex(order => order.id === facture.commandeId)
        if(indexOfFacture !== -1) {facturesTab.push(facture)}
    })
    return facturesTab
}


export const getNewUserFactures = createSelector(
    factures,
    getUserOrders,
    userFactures
)


const userFactureList = state => state.entities.facture.userFactures

const getRatio = (list) => {
    let ratio = 0;
    let ratioTab = {}
    for(let i=0; i<list.length; i++) {
        (function (i) {
            ratio = list[i].solde / list[i].montant
            if(ratio > 0) {
                ratio = Number(ratio.toFixed(2))
            } else ratio = 0.01

            ratioTab[list[i].id] = {
                id: list[i].id,
                ratio
            }
        })(i)
    }
 return ratioTab
}


export const getFactureRatio = createSelector(
    userFactureList,
    getRatio
)