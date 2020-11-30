import {createSlice} from '@reduxjs/toolkit'
import {addToCart, changeItemQuantity} from '../actionsCreators/shoppingCartActionCreator'
import {apiRequest} from "../actionsCreators/apiActionCreator";

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState: {
        items: {},
        cartItems: [],
        totalAmount: 0,
        itemsLenght: 0,
        type: '',
        addToCartSuccess: false,
        newAdded: {},
        loading: false,
        error: null,
        provenance: '',
        showModal: false,
        ecommerceModal: false,
        elocationModal: false,
        eserviceModal: false,
        commerceDetailModal: false,
        locationDetailModal: false
    },
    reducers: {
        shoppingCartRequested: (state) => {
            state.error = null
            state.loading = true
        },
        shoppingCartRequestFailed:(state, action) => {
          state.loading = false
          state.error = action.payload
        },
        setProvenance: (state, action) => {
          state.provenance = action.payload
        },
        itemAddedToCart: (state, action) => {
          state.error = null
          state.addToCartSuccess = true
          state.newAdded = action.payload
         switch (state.provenance) {
             case "ecommerce":
                 state.ecommerceModal = true
                 break;
             case "elocation":
                 state.elocationModal = true
                 break;
             case "eservice":
                 state.eserviceModal = true
                 break;
             case "commerceDetail":
                 state.commerceDetailModal = true
                 break;
             case "locationDetail":
                 state.locationDetailModal = true
                 break;
             default:
                 state.showModal = true
         }
          state.loading = false
            const newProduit = action.payload
            if(state.items[newProduit.id]) {
                state.items[newProduit.id].quantite++
                state.items[newProduit.id].montant += newProduit.prix;
                state.itemsLenght ++
                state.totalAmount+=newProduit.prix
            } else {
                state.items[newProduit.id] = newProduit;
                state.itemsLenght +=newProduit.quantite;
                state.type = state.items[newProduit.id].type || state.items[newProduit.id].typeCmde
                if (newProduit.type === 'e-location') {
                    state.totalAmount+=newProduit.caution * newProduit.prix
                } else {
                    state.totalAmount += newProduit.prix * newProduit.quantite
                }
            }
        },
        clearCart: (state, action)=> {
            state.items = {}
            state.totalAmount = 0
            state.itemsLenght = 0
            state.type=''
        },
        dismissItemModal: (state) => {
            state.newAdded = {}
            state.addToCartSuccess = false
            state.showModal = false
            state.ecommerceModal = false
            state.elocationModal = false
            state.eserviceModal = false
            state.commerceDetailModal = false,
            state.locationDetailModal = false
            state.provenance = ''
        },
        updateItem: (state, action) => {
            let selectedItem = state.items[action.payload.id]
            selectedItem.prix = action.payload.montant
            selectedItem.montant = action.payload.montant
            state.totalAmount = action.payload.montant
        },
        deleteCartItem: (state, action) => {
            let selectedItem = state.items[action.payload.id]
            if (selectedItem.quantite === 1) {
                delete state.items[selectedItem.id]
                state.itemsLenght--
                if(state.type == 'e-service') {
                    state.totalAmount = 0
                }else if(state.type == 'e-location') {
                    state.totalAmount -= selectedItem.prix*selectedItem.caution
                } else {
                state.totalAmount -= selectedItem.prix
                }
            }
             else {
            selectedItem.quantite--
            selectedItem.montant-= selectedItem.prix
            state.items[selectedItem.id] = selectedItem
                state.itemsLenght--
                state.totalAmount -= selectedItem.prix
            }
             if(state.itemsLenght === 0) {
                 state.type = ''
             }
        },
        cartItemsReceived: (state, action) => {
            state.loading = false
            state.error = null
            const currentItems = action.payload
            state.cartItems = currentItems
            let cartLength = 0
            let cartAmount = 0
            currentItems.forEach(item => {
                state.items[item.id] = item.CartItem
                cartLength += item.CartItem.quantite
                cartAmount += item.CartItem.montant
            })
            state.itemsLenght = cartLength
            state.totalAmount = cartAmount
        }
    },
    extraReducers: {
        [addToCart]: (state, action) => {},
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
const {clearCart, dismissItemModal, updateItem, deleteCartItem,cartItemsReceived,
       itemAddedToCart, shoppingCartRequested, shoppingCartRequestFailed, setProvenance} = shoppingCartSlice.actions
//action creators

const url = '/shoppingCarts'

export const getCartItems = () => apiRequest({
    url:url+'/cartItems',
    method: 'get',
    onStart: shoppingCartRequested.type,
    onSuccess: cartItemsReceived.type,
    onError: shoppingCartRequestFailed.type
})

export const getAddItemToCart = (item) => apiRequest({
    url: url+'/addToCart',
    data: item,
    method: 'post',
    onStart:  shoppingCartRequested.type,
    onSuccess: itemAddedToCart.type,
    onError: shoppingCartRequestFailed.type
})
export const getCartClear = () => dispatch => {
    dispatch(clearCart())
}

export const getModalDismiss = () => dispatch => {
    dispatch(dismissItemModal())
}

export const setItemServiceMontant = (data) => apiRequest({
    url:url+'/updateItem',
    data,
    method: 'patch',
    onStart: shoppingCartRequested.type,
    onSuccess: updateItem.type,
    onError: shoppingCartRequestFailed.type
})

export const getCartItemDelete = (data) => apiRequest({
    url:url+'/deleteItem',
    method: 'delete',
    data,
    onStart: shoppingCartRequested.type,
    onSuccess: deleteCartItem.type,
    onError: shoppingCartRequestFailed.type
})

export const getProvenanceSet = (label) => dispatch => {
    dispatch(setProvenance(label))
}