import authService from '../../api/authService'

 export const SIGNUP = 'SIGNUP';
 export const LOGIN = 'SIGNIN';

export const registerUser = (username, email, password) => {
    return async dispatch => {
        try {
            const response = await authService.signup(username, email, password);
          /*  if (!response.ok) {
                throw new Error(response.problem);
            }*/
        /*    const userData = response.data;
            dispatch({
                type: SIGNUP,
                userData: {
                    username: userData.username,
                    email: userData.email,
                    password:userData.password
                }
            })*/
        return response
        } catch (e) {
            console.log(e.message)
        }


    }
};

export const login = (username, password) => {
    return async dispatch => {
        try {
            const response = await authService.login(username, password);
            if (!response.ok) {
                throw new Error(response.problem)
            }
            const userData = response.data;
            console.log(userData);
            dispatch({
                type: LOGIN,
                payload: {username, password}
            })

        } catch (e) {
            throw new Error(e.message)
        }

    }
}