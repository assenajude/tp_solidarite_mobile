import {createSlice} from "@reduxjs/toolkit";
import order from "../../models/order";
import {addToOrder} from '../actionsCreators/orderActionCreator'

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        list: []
    },
    reducers: {},
    extraReducers: {
        [addToOrder]: (state, action) => {
            //const newOrder = new order(action.payload.items, action.payload.itemsLength, action.payload.amount)
            const order = {
                items: action.payload.items,
                itemsLenght: action.payload.itemsLength,
                amount: action.payload.amount
            }
            state.list.push(order)
        }
    }
});

export default orderSlice.reducer;
