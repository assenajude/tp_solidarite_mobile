import categorieService from "../../api/categorieService";
export const SET_CATEG = 'SET_CATEGORIE';
export const ADD_CATEGORIE = 'ADD_CATEGORIE'

export const setCategories = () => {
     return async dispatch => {
         try {
             const response = await categorieService.getAllCategories();
             const categorieData = response.data;
             dispatch({
                 type: SET_CATEG,
                 loadedCategories: categorieData

             })
         } catch (e) {
             throw new Error(e.message)
         }

     }
};

export const addCategorie = (categorie) => {
    return async dispatch => {
        try {
            const response = await categorieService.addCategorie(categorie);
            const categorieData = response.data
            dispatch({
                type: ADD_CATEGORIE,
                categorie: categorieData
            })

        } catch (e) {
            throw new Error(e.message)
        }

    }
}