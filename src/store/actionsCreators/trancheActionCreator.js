import {createAction} from "@reduxjs/toolkit";

export const saveTranche = createAction('tranche/newTranche', function (trancheData) {
 /*   let newTranches = []
    for(key in trancheData) {
        newTranches.push(trancheData[key])
    }*/
    return {
        payload:trancheData
    }

})