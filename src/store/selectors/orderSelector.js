import {createSelector} from 'reselect';

const totalAmount = state => state.entities.order.currentOrder.amount;
const compensation = state => state.entities.payement.currentPlan.compensation;

const interet = (amount,taux ) => {
    let tauxValue = 0;
    if (amount && taux) {
        tauxValue = amount * taux;
    }
    return tauxValue
}

const tauxPercent = (taux) => {
    let percent = 0;
    if (taux) {
        percent = taux * 100
    }
    return percent
}

export const getInteretValue = createSelector(
    totalAmount,
    compensation,
    interet
);


export const getTaux = createSelector(
    compensation,
    tauxPercent
)

