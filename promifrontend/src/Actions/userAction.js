import axios from "axios"
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