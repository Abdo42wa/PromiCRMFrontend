import axios from 'axios'
export const getCountries = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'COUNTRY_FETCH_REQUEST'
        });
        //getting token from usersReducer state
        const token = getState().usersReducer.currentUser;
        const response = await axios.get(`/api/Countries`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'COUNTRY_FETCH_SUCCESS',
            payload: response.data
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'COUNTRY_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

