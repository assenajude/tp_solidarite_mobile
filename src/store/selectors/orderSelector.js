import {createSelector} from 'reselect';

const totalAmount = state => state.entities.order.currentOrder.amount;
const compensation = state => {
    const currentPlan = state.entities.payement.currentPlan;
    if(currentPlan) {
        return currentPlan.compensation
    }
    return 0;
};

const kilometre = state => {
    const ville = state.entities.ville.userVille
      if(ville){
          return ville.kilometrage
      }
    return 0;
}

const prixByKilo = state => {
    const ville = state.entities.ville.userVille
    if(ville){
        return ville.prixKilo
    }
    return 0;
}

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

const payementTotal = (amount, interet) => {
    return amount + interet
}

const fraisLivraison = (km, prix) => {
    let result = 0;
    if (km && prix) {
        result = km * prix
    }
    return result
}

const totalFinal = (montant, frais) => {
    return montant + frais
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