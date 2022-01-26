import promiAPI from "./promiAPI";

export const getOrders = () => async (dispatch, getState) => {
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

export const insertManyMaterials = (postObj,callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_MATERIAL_INSERT_MANY_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/ProductMaterials/insert/orders`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'ORDER_MATERIAL_INSERT_MANY_SUCCESS',
            payload: response.data
        });
        callback()
    } catch (error) {
        dispatch({
            type: 'ORDER_MATERIAL_INSERT_MANY_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getUncompletedOrdersTimes = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'ORDERS_UNCOMPLETED_TIMES_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get('/api/Orders/planned/time',{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'ORDERS_UNCOMPLETED_TIMES_FETCH_SUCCESS',
            payload: response.data
        })
    }catch(error){
        dispatch({
            type: 'ORDERS_UNCOMPLETED_TIMES_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getUrgetOrders = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'ORDERS_URGENT_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/urgent`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'ORDERS_URGENT_FETCH_SUCCESS',
            payload: response.data
        })
    }catch(error){
        dispatch({
            type: 'ORDERS_URGENT_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getRecentOrders = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'ORDERS_RECENT_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/recent`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'ORDERS_RECENT_FETCH_SUCCESS',
            payload: response.data
        })
    }catch(error){
        dispatch({
            type: 'ORDERS_RECENT_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getUncompletedWarehouseOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'UNCOMPLETED_WAREHOUSE_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/warehouseUncompleted`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'UNCOMPLETED_WAREHOUSE_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'UNCOMPLETED_WAREHOUSE_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

}


export const getUncompletedExpressOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/express`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const getOrdersUncompleted = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'UNCOMPLETED_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/uncompleted`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'UNCOMPLETED_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'UNCOMPLETED_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getClientsOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'CLIENT_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/clients`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'CLIENT_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'CLIENT_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getLastWeeksCompletedOrders = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'LAST_WEEKS_ORDERS_FETCH_REQUEST'
        });
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/weeksOrders`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'LAST_WEEKS_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
        callback()
    } catch (error) {
        dispatch({
            type: 'LAST_WEEKS_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getLastMonthCompletedOrders = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'LAST_MONTH_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/monthOrders`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'LAST_MONTH_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
        callback()
    } catch (error) {
        dispatch({
            type: 'LAST_MONTH_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
// FOR "Standartinis orders". It will create order and take materials from materialsWarehouse
export const addOrder = (postObject) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        // ,'Content-Type': 'multipart/form-data'
        // 'Content-Type': 'application/json'
        const response = await promiAPI.post(`/api/Orders`, postObject, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'ORDER_CREATE_SUCCESS',
            payload: response.data
        });
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

export const createNonStandartOrder = (postObject) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_NON_STANDART_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        // ,'Content-Type': 'multipart/form-data'
        // 'Content-Type': 'application/json'
        const response = await promiAPI.post(`/api/Orders/nonstandart`, postObject, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'ORDER_NON_STANDART_CREATE_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'ORDER_NON_STANDART_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const addOrderWarehouse = (postObject) => async (dispatch, getState) => {
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

export const updateOrder = (postObj, reducerObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_UPDATE_REQUEST'
        });
        // get token from usersReducer
        const token = getState().usersReducer.currentUser;
        await promiAPI.put(`/api/Orders/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'ORDER_UPDATE_SUCCESS',
            payload: reducerObj
        });
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

export const updateNonStandartOrder = (postObj,reducerObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'NON_STANDART_ORDER_UPDATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await promiAPI.put(`/api/Orders/nonstandart/${reducerObj.id}`,postObj, {headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'NON_STANDART_ORDER_UPDATE_SUCCESS',
            payload: reducerObj
        })
    }catch (error) {
        dispatch({
            type: 'NON_STANDART_ORDER_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateOrderTakeProductsFromWarehouse = (postObj,reducerObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'ORDER_WAREHOUSE_UPDATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await promiAPI.put(`/api/Orders/warehouse/subtract/${reducerObj.id}`,postObj,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'ORDER_WAREHOUSE_UPDATE_SUCCESS',
            payload: reducerObj
        })
    }catch (error) {
        dispatch({
            type: 'ORDER_WAREHOUSE_UPDATE_FAIL',
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
