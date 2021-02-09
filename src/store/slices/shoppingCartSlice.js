import {createSlice} from '@reduxjs/toolkit'
import {apiRequest} from "../actionsCreators/apiActionCreator";

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState: {
        items: {},
        cartItems: [],
        totalAmount: 0,
        itemsLenght: 0,
        type: '',
        cartMode: '',
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
            const newAddedItem = action.payload
            const currentItem = newAddedItem.CartItem
            const itemId = newAddedItem.id
            if(state.items[itemId]) {
                state.items[itemId].CartItem.quantite++
                state.items[itemId].CartItem.montant += newAddedItem.prixPromo;
                state.itemsLenght++
                state.totalAmount+=newAddedItem.prixPromo
            } else {
                   let montantTotal = 0
                    state.items[itemId] = newAddedItem;
                if(currentItem.itemType === 'location') {
                    montantTotal = currentItem.prix * newAddedItem.nombreCaution || currentItem.prix * 4
                } else  {
                    montantTotal = currentItem.montant
                }

                state.totalAmount += montantTotal
                state.itemsLenght +=currentItem.quantite;
                state.type = currentItem.itemType
                state.cartMode = newAddedItem.aide?'credit':'cash'
            }

            state.loading = false
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
            state.loading = false
            let selectedItem = state.items[action.payload.id]
            selectedItem.CartItem
                .prix = action.payload.montant
            selectedItem.CartItem
                .montant = action.payload.montant
            state.items[action.payload.id] = selectedItem
            state.itemsLenght = 1
            state.totalAmount = action.payload.montant
        },
        deleteCartItem: (state, action) => {
            state.loading = false
            state.error = null
            const itemId = action.payload.id
            let selectedItem = state.items[itemId]
            if(state.type === 'article') {
                if(selectedItem.CartItem.quantite > 1) {
                    selectedItem.CartItem.quantite--
                    selectedItem.CartItem.montant-= selectedItem.prixPromo
                    state.items[selectedItem.id] = selectedItem
                } else {
                    delete state.items[itemId]
                    state.type = ''
                }
                    state.itemsLenght--
                    state.totalAmount -= selectedItem.prixPromo
            } else {
                delete state.items[itemId]
                state.itemsLenght = 0
                state.totalAmount = 0
                state.type = ''
            }
        },
        cartItemsReceived: (state, action) => {
            state.loading = false
            state.error = null
            const currentItems = action.payload
            state.cartItems = currentItems
            if(currentItems.length >0 ) {
                let cartLength = 0
                let cartAmount = 0
                currentItems.forEach(item => {
                    state.items[item.id] = item
                    cartLength += item.CartItem.quantite
                    if(item.CartItem.itemType ==='location') {
                    cartAmount += item.CartItem.prix * item.nombreCaution
                    } else {
                        cartAmount+= item.CartItem.montant

                    }
                })
                state.totalAmount = cartAmount
                state.itemsLenght = cartLength
                state.type = currentItems[0].CartItem.itemType
            } else {
                state.items = {}
                state.cartItems = []
                state.totalAmount = 0
                state.itemsLenght = 0
                state.type = ''
                state.newAdded = {}

            }
        },
        incrementItemQty: (state, action) => {
          state.loading = false
            state.error = null
            let selectedItem = state.items[action.payload.id]
          selectedItem.CartItem.quantite++
          selectedItem.CartItem.montant+=action.payload.prix
          state.items[action.payload.id] = selectedItem
          state.itemsLenght++
          state.totalAmount+=action.payload.prix
        },
        decrementItemQty: (state, action) => {
            state.loading = false
            state.error = null
            let selectedItem = state.items[action.payload.id]
            selectedItem.CartItem.quantite--
            selectedItem.CartItem.montant -= action.payload.prix
            state.items[action.payload.id] = selectedItem
            state.itemsLenght--
            state.totalAmount-= action.payload.prix
        }
    }
});

export default shoppingCartSlice.reducer;
const {clearCart, dismissItemModal, updateItem, deleteCartItem,cartItemsReceived,
       itemAddedToCart, shoppingCartRequested, shoppingCartRequestFailed,
       setProvenance, incrementItemQty, decrementItemQty} = shoppingCartSlice.actions
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

export const getItemQtyIncrement = (item) => apiRequest({
    url:url+'/incrementQuantity',
    method: 'patch',
    data: item,
    onStart: shoppingCartRequested.type,
    onSuccess: incrementItemQty.type,
    onError: shoppingCartRequestFailed.type
})

export const getItemQtyDecrement = (item) => apiRequest({
    url:url+'/decrementQuantity',
    method: 'patch',
    data: item,
    onStart: shoppingCartRequested.type,
    onSuccess: decrementItemQty.type,
    onError: shoppingCartRequestFailed.type
})