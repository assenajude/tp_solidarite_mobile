import payementService from "../../api/payementService";
export const GET_SUCCESS = 'GET_PAYEMENTS';
export const GET_FAILED = 'GET_FAILED';
export const ADD_STARTED = 'ADD_STARTED';
export const ADD_SUCCESS = 'ADD_SUCCESS';
export const ADD_FAILED = 'ADD_FAILED';
export const GET_STARTED = 'GET_STARTED'

export const getAllPayements = () => {
    return async dispatch =>
    {
        const getStarted = () => {
          dispatch({
              type: GET_STARTED
          })
        };
        const onSuccess = (data) => {
            dispatch({
                type: GET_SUCCESS,
                loadedPayments: data
            })
        };
        const onFail = (error) => {
            dispatch({
                type: GET_FAILED,
                errorContent: error
            })
        };
        try {
            getStarted();
            const response = await payementService.getPayement();
            if (!response.ok) return onFail(response.problem);
            return onSuccess(response.data)
        } catch (e) {
            return onFail(e.message)
        }
    }
};

export const addPayement = (payement) => {
    return async dispatch => {
    const getStarted = () => {
        dispatch({
            type: ADD_STARTED
        })
    };

    const onAddSuccess = (payementData) => {
        dispatch({
            type: ADD_SUCCESS,
            payement: payementData
        })
    };

    const onFail = (error) => {
        dispatch({
            type: ADD_FAILED,
            errorData: error
        })
    };

    try{
        getStarted();
        const response = await payementService.addPayement(payement);
        if (!response.ok) return onFail(response.problem)
        onAddSuccess(response.data)
    } catch (e) {
        return onFail(e.message)
    }
    }
}
