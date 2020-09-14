import {createSlice} from '@reduxjs/toolkit'
import {addToCart, changeItemQuantity} from '../actionsCreators/shoppingCartActionCreator'

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState: {
        items: {},
        totalAmount: 0,
        itemsLenght: 0
    },
    reducers: {
        clearCart: (state, action)=> {
            state.items = {}
            state.totalAmount = 0
            state.itemsLenght = 0
        }
    },
    extraReducers: {
        [addToCart]: (state, action) => {
            const newProduit = action.payload
            if(state.items[newProduit.id]) {
                state.items[newProduit.id].quantite++
                state.items[newProduit.id].montant += newProduit.prix;
                state.itemsLenght ++
                state.totalAmount+=newProduit.prix
            } else {
                state.items[newProduit.id] = newProduit;
                state.itemsLenght ++;
                state.totalAmount += newProduit.prix
            }
        },
        [changeItemQuantity]: (state, action) => {
            const itemId = action.payload.id;
            const itemQuantite = action.payload.quantite
            const lastItem = state.items[itemId];
            const lastQuantity = lastItem.quantite;
            const lastMontant = lastItem.montant;
            state.items[itemId].quantite = itemQuantite;
            state.items[itemId].montant = itemQuantite * lastItem.prix;
            state.itemsLenght -= lastQuantity;
            state.totalAmount -= lastMontant;
            state.itemsLenght += state.items[itemId].quantite;
            state.totalAmount += state.items[itemId].montant
        }
    }
});

export default shoppingCartSlice.reducer;
const {clearCart} = shoppingCartSlice.actions
//action creators

export const getCartClear = () => dispatch => {
    dispatch(clearCart())
}