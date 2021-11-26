import axios from "axios";

export const getWarehouseData = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WAREHOUSES_FETCH_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.get(`https://promicrm20211126160923.azurewebsites.net/api/WarehouseCountings`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'WAREHOUSES_FETCH_SUCCESS',
            payload: response.data
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'WAREHOUSES_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const createWarehouseData = (postObj, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WAREHOUSES_CREATE_REQUEST'
        });
        const token = getState().usersReducer.currentUser;
        const response = await axios.post(`https://promicrm20211126160923.azurewebsites.net/api/WarehouseCountings`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'WAREHOUSES_CREATE_SUCCESS',
            payload: response.data
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'WAREHOUSES_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateWarehouseData = (postObj, reducerObj, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WAREHOUSES_UPDATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.put(`https://promicrm20211126160923.azurewebsites.net/api/WarehouseCountings/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'WAREHOUSES_UPDATE_SUCCESS',
            payload: reducerObj
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'WAREHOUSES_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}