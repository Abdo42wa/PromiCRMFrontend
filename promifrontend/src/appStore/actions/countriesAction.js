import promiAPI from './promiAPI';
export const getCountries = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'COUNTRY_FETCH_REQUEST'
        });
        //getting token from usersReducer state
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Countries`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'COUNTRY_FETCH_SUCCESS',
            payload: response.data
        });
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
export const addCountry = (postObject) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'COUNTRY_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/Countries`, postObject, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'COUNTRY_CREATE_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'COUNTRY_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateCountry = (postObj, reducerObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'COUNTRY_UPDATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        await promiAPI.put(`/api/Countries/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'COUNTRY_UPDATE_SUCCESS',
            payload: reducerObj
        });
    } catch (error) {
        dispatch({
            type: 'COUNTRY_UPDATE_SUCCESS',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
