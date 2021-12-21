import promiAPI from "./promiAPI";

export const getOrders = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_FETCH_REQUEST'
        });
        //get token from users reducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'ORDER_FETCH_SUCCESS',
            payload: response.data
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'ORDER_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getUncompletedOrders = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'UNCOMPLETED_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/uncompleted`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'UNCOMPLETED_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
    }catch (error) {
        dispatch({
            type: 'UNCOMPLETED_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
    
}


export const getUncompletedExpressOrders = (callback) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/express`,{headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
        callback()
    }catch (error) {
        dispatch({
            type: 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getCompletedWarehouseOrders = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'COMPLETED_WAREHOUSE_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/warehouseCompleted`,{headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'COMPLETED_WAREHOUSE_ORDERS_FETCH_SUCCESS',
            payload: response.data
        });
 
    }catch (error) {
        dispatch({
            type: 'COMPLETED_WAREHOUSE_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const addOrder = (postObject, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/Orders`, postObject, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'ORDER_CREATE_SUCCESS',
            payload: response.data
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'ORDER_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const addOrderWarehouse = (postObject, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/Orders/warehouse`, postObject, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'ORDER_CREATE_SUCCESS',
            payload: response.data
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'ORDER_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateOrder = (postObj, reducerObj, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_UPDATE_REQUEST'
        });
        // get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.put(`/api/Orders/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'ORDER_UPDATE_SUCCESS',
            payload: reducerObj
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'ORDER_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateOrderWithImage = (postObj, id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_UPDATE_IMAGE_REQUEST'
        });
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.put(`/api/Orders/image/${id}`, postObj, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
        dispatch({
            type: 'ORDER_UPDATE_IMAGE_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'ORDER_UPDATE_IMAGE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}