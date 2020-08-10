export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (items,itemsNumber, amount) => {
    return {
        type: ADD_ORDER,
        orderData: {
            items: items,
            itemsNumber: itemsNumber,
            amount: amount
        }
    }

}