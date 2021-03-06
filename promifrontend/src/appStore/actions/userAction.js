import promiAPI from './promiAPI';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
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

        const { data } = await promiAPI.post('/api/Accounts/login', { email, password }, config)

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })
        var expiration = new Date(new Date().getTime() + 50 * 60 * 1000);
        Cookies.set('currentUser', data.token, {
            expires: expiration
        });
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
    Cookies.remove('currentUser')
    dispatch({ type: 'USER_LOGOUT' })

}

export const getUserTypes = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'USER_TYPES_FETCH_REQUEST'
        });
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get('/api/Accounts/types', { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'USER_TYPES_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'USER_TYPES_FETCH_FAIL',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const register = (postObj) => async (dispatch, getState) => {

    try {
        dispatch({
            type: 'USER_REGISTER_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post('/api/Accounts/register', postObj, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: response.data,
        })
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

export const getLoggedUser = () => async(dispatch,getState)=> {
    try{
        const connectedUser = getState().usersReducer.currentUser;
        const decodedUser = jwtDecode(connectedUser); // decode your token here
        dispatch({
            type: 'GET_LOGGED_USER_SUCCESS',
            payload: decodedUser
        })
    }catch(error){
        dispatch({
            type: 'GET_LOGGED_USER_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
    
}