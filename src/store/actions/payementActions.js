import payementService from "../../api/payementService";
export const GET_PAYEMENTS = 'GET_PAYEMENTS';
export const ADD_PAYEMENT = 'ADD_PAYEMENT';

export const getAllPayements = () => {
    return async dispatch =>
    {
        try{
            const response = await payementService.getPayement();
            dispatch({
                type: GET_PAYEMENTS,
                payements: response.data
            })
        } catch (e) {
            throw new Error(e.message)
        }

    }
};

export const addPayement = (payement) => {
    return async dispatch => {
        const newPayement = await payementService.addPayement(payement);
        dispatch({
            type: ADD_PAYEMENT,
            payement: newPayement.data
        })
    }
}