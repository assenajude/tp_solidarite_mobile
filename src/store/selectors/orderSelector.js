import {createSelector} from '@reduxjs/toolkit';

const totalAmount = state => state.entities.order.currentOrder.amount;
const compensation = state => state.entities.payement.currentPlan.compensation || 0
/*{
    const currentPlan = state.entities.payement.currentPlan;
    if(currentPlan) {
        return currentPlan.compensation
    } else return 0;
};*/

const kilometre = state => state.entities.ville.userVille.kilometrage || 0
/*{
    const ville = state.entities.ville.userVille
      if(ville){
          return ville.kilometrage
      }
    return 0;
}*/

const prixByKilo = state => state.entities.ville.userVille.prixKilo || 0
/*{
    const ville = state.entities.ville.userVille
    if(ville){
        return ville.prixKilo
    }
    return 0;
}*/

const interet = (amount,taux ) => Math.ceil(amount * taux) || 0
/*{
    return Math.ceil(amount * taux) || 0
}*/

const tauxPercent = (taux) => {
    let percent = 0;
    if (taux) {
        percent = taux * 100
    }
   const percentFixed = Number(percent.toFixed(2))
    return percentFixed
}

const payementTotal = (amount, interet) => {

    return amount + interet || 0
}

const fraisLivraison = (km, prix) => {
    return km * prix || 0
}

const totalFinal = (montant, frais) => {

    return montant + frais || 0
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



export const getTotalWithPayement = createSelector(
    totalAmount,
    getInteretValue,
    payementTotal

)


export const getFraisLivraison = createSelector(
    kilometre,
    prixByKilo,
    fraisLivraison
)

export const getTotalFinal = createSelector(
    getTotalWithPayement,
    getFraisLivraison,
    totalFinal
)


const currentOrder = state => state.entities.order.currentOrder

const totalPartCaution = (item) => {
    const itemList = item.items
    let totalPartCaution = 0
    let totalCaution = 0
    if(itemList.length>=1) {
        itemList.forEach(item => {
            totalPartCaution += item.caution
            totalCaution += item.montant * item.caution
        })
    }
    return {totalPartCaution, totalCaution}
}


export const getTotalPartCaution = createSelector(
    currentOrder,
    totalPartCaution
)
