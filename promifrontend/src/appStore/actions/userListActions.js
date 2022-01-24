import promiAPI from "./promiAPI";
export const getUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'FETCH_ALL_REQUEST'
        });
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get('/api/Accounts', { headers: { Authorization: `Bearer ${token}` } })

        dispatch({
            type: 'FETCH_ALL_SUCCESS',
            payload: response.data,
        });
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