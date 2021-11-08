import axios from "axios"
import jwtDecode from 'jwt-decode';
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'USER_LOGIN_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('https://localhost:44324/api/Accounts/login', { email, password }, config)

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }

}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: 'USER_LOGOUT' })

}

export const register = (firstName, lastName, phoneNumber, position, email, password) => async (dispatch) => {

    try {

        dispatch({
            type: 'USER_REGISTER_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post('https://localhost:44324/api/Accounts/register',
            { firstName, lastName, phoneNumber, position, email, password },
            config
        )

        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: data,
        })

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

}

export const getUserData = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'USER_DATA_REQUEST'
        });
        const { usersReducer: { currentUser } } = getState();//get user info

        const token = currentUser;
        let userRole = '';
        const userData = jwtDecode(token);
        if (userData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Administrator') {
            userRole = 'Administrator';
        } else if (userData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'User') {
            userRole = 'User'
        }
        const user = {
            'userRole': userRole,
            'exp': userData.exp
        }

        dispatch({
            type: 'USER_DATA_SUCCESS',
            payload: user
        });
        callback()
    } catch (error) {
        dispatch({
            type: 'USER_DATA_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}