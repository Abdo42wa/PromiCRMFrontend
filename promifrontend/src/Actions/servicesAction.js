import axios from "axios";

export const getServices = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'SERVICES_FETCH_REQUEST'
        });
        //get token from users reducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.get(`/api/Services`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'SERVICES_FETCH_SUCCESS',
            payload: response.data
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'SERVICES_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}