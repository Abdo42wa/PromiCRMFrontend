import axios from 'axios'
export const getCountries = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'COUNTRY_FETCH_REQUEST'
        });
        //getting token from usersReducer state
        const token = getState().usersReducer.currentUser;
        const response = await axios.get(`https://promicrm20211126160923.azurewebsites.net/api/Countries`, { headers: { Authorization: `Bearer ${token}` } })
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
export const addCountry = (postObject, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'COUNTRY_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.post(`https://promicrm20211126160923.azurewebsites.net/api/Countries`, postObject, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'COUNTRY_CREATE_SUCCESS',
            payload: response.data
        });
        callback();
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


export const updateCountry = (postObj, reducerObj, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'COUNTRY_UPDATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.put(`https://promicrm20211126160923.azurewebsites.net/api/Countries/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'COUNTRY_UPDATE_SUCCESS',
            payload: reducerObj
        });
        callback();
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
