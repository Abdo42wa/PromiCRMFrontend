import axios from "axios";

export const getCurrencies = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'CURRENCY_FETCH_REQUEST'
        });
        //get token from users reducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.get(`/api/Currencies`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'CURRENCY_FETCH_SUCCESS',
            payload: response.data
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'CURRENCY_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}