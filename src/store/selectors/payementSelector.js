import {createSelector} from "@reduxjs/toolkit";

const orderList = state => state.entities.order.list
const payementList = state => state.entities.payement.list
const planList = state => state.entities.plan.list

const orderPayementList = (list,planList, payementList) => {
    let modeObject = {};
    let itemObject = {};
    for(let i=0; i < list.length; i++) {
        (function (i) {
            const idPlan = list[i].PlanId
            const plan = planList.find(plan => plan.id === idPlan)
            const payement = payementList.find(payement => payement.id === plan.PayementId)
            if(payement) {
                itemObject = {
                    numero: list[i].numero,
                    payementMode: payement.mode,
                    id: list[i].id
                }
            modeObject[list[i].id] = itemObject
            }
        })(i)
    }
    return modeObject
}

export const getOrderPayementMode = createSelector(
    orderList,
    planList,
    payementList,
    orderPayementList
)