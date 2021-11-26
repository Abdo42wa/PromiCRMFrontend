import axios from 'axios'

export const getProducts = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'PRODUCTS_FETCH_REQUEST'
        });
        //get token form usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.get(`https://promicrm20211126160923.azurewebsites.net/api/Products`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'PRODUCTS_FETCH_SUCCESS',
            payload: response.data
        });
        callback()
    } catch (error) {
        dispatch({
            type: 'PRODUCTS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const addProduct = (postObject, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'PRODUCTS_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.post(`https://promicrm20211126160923.azurewebsites.net/api/Products`, postObject, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'PRODUCTS_CREATE_SUCCESS',
            payload: response.data
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'PRODUCTS_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateProduct = (postObj, reducerObj, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'PRODUCTS_UPDATE_REQUEST'
        });
        // get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.put(`https://promicrm20211126160923.azurewebsites.net/api/Products/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'PRODUCTS_UPDATE_SUCCESS',
            payload: reducerObj
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'PRODUCTS_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}