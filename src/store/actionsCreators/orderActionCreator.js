import {createAction} from '@reduxjs/toolkit';

export const addToOrder = createAction('order/addToOrder', function (items, itemsLength, amount) {
    return {
        payload: {
            items,
            itemsLength,
            amount
        }
    }

})