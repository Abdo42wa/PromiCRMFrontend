import promiAPI from "./promiAPI";

export const getShipments = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'SHIPMENTS_FETCH_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Shipments`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'SHIPMENTS_FETCH_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'SHIPMENTS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createShipment = (postObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'SHIPMENTS_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/Shipments`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'SHIPMENTS_CREATE_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'SHIPMENTS_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateShipment = (postObj, reducerObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'SHIPMENT_UPDATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.put(`/api/Shipments/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'SHIPMENT_UPDATE_SUCCESS',
            payload: reducerObj
        });
    } catch (error) {
        dispatch({
            type: 'SHIPMENT_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


