import {ADD_CATEGORIE, SET_CATEG} from "../actions/categorieActions";

const initialState = {
    categories: []
}

export default (state = initialState, action ) => {
    let newState;
    switch (action.type) {
        case SET_CATEG:
            newState = {
                ...state,
                categories: action.loadedCategories
            }
            return newState || state;
        case ADD_CATEGORIE:
            const newCategorie = action.categorie;
            newState = {
                ...state,
                categories: state.categories.concat(newCategorie)
            }
            return newState || state;
        default:
            return state

    }
}