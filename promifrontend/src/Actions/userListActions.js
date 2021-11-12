import axios from 'axios'
export const getUsers = (callback) => async(dispatch,getState) =>{
    try {
        dispatch({
            type: 'FETCH_ALL_REQUEST'
        });
        const token = getState().usersReducer.currentUser;
        const response = await axios.get('/api/Accounts',{ headers: { Authorization: `Bearer ${token}` } })

        dispatch({
            type: 'FETCH_ALL_SUCCESS',
            payload: response.data,
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'FETCH_ALL_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}