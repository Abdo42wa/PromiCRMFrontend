import axios from "axios"
export const userLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'USER_LOGIN_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/Accounts/login', { email, password }, config)

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            typr: 'USEL_LOGIN_FAIL',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }

}