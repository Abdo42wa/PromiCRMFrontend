import promiAPI from "./promiAPI";

export const getOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDERS_FETCH_REQUEST'
        });
        //get token from users reducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'ORDERS_FETCH_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getNonStandartOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'NON_STANDART_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get('/api/Orders/nonstandart', { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'NON_STANDART_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'NON_STANDART_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'ORDER_FETCH_SUCCESS',
            payload: response.data
        })
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

export const getNonStandartOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'NON_STANDART_ORDER_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/nonstandart/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'NON_STANDART_ORDER_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'NON_STANDART_ORDER_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

// getting order with max orderNumber
export const getMaximumOrderNumber = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDERS_ORDER_NUMBER_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/biggest/orderNumber`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'ORDERS_ORDER_NUMBER_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'ORDERS_ORDER_NUMBER_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    } finally {

    }
}

export const updateOrderObj = (inputName, value, orderType) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_OBJ_UPDATE_SUCCESS',
            payload: { name: inputName, value: value, orderType: orderType }
        })
    } finally {

    }
}

// export const updateNonStandartOrderObj = async(inputName,value)=>{
//     try{
//         dispatch({
//             type: 'ORDER_NON_STANDART_OBJ_UPDATE_SUCCESS',
//             payload: {name: inputName, value: value}
//         })
//     }finally{

//     }
// }

export const updateNonStandartObjServices = (id, value, record, serviceId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_NON_STANDART_OBJ_SERVICE_UPDATE',
            payload: { id: id, value: value, record: record, serviceId: serviceId }
        })
    } finally {

    }
}


//------------------------ ADD AND UPDATE OF ORDERS UserServices
//ON UserService create in nonStandartOrdersComponent
export const addNonStandartOrderService = (postObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'NON_STANDART_ORDER_SERVICE_CREATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/UserServices`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'NON_STANDART_ORDER_SERVICE_CREATE_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'NON_STANDART_ORDER_SERVICE_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

//ON UserService create in StandartOrdersComponent
export const addOrderService = (postObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_SERVICE_CREATE_REQUEST',
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/UserServices`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'ORDER_SERVICE_CREATE_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'ORDER_SERVICE_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
//UserService update in nonStandartOrdersComponent
export const updateNonStandartOrderService = (postObj, reducerObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'NON_STADARNT_ORDER_SERVICE_UPDATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await promiAPI.put(`/api/UserServices/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'NON_STADARNT_ORDER_SERVICE_UPDATE_SUCCESS',
            payload: reducerObj
        })
    } catch (error) {
        dispatch({
            type: 'NON_STADARNT_ORDER_SERVICE_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
//UserService update in StandartOrdersComponent
export const updateOrderService = (postObj, reducerObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_SERVICE_UPDATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await promiAPI.put(`/api/UserServices/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'ORDER_SERVICE_UPDATE_SUCCESS',
            payload: reducerObj
        })
    } catch (error) {
        dispatch({
            type: 'ORDER_SERVICE_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
//------------------------ ENDDD OF ADD AND UPDATE OF ORDERS UserServices

export const insertManyMaterials = (postObj, callback) => async (dispatch, getState) => {
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


export const updateOrder = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_UPDATE_REQUEST'
        });
        // get token from usersReducer
        const token = getState().usersReducer.currentUser;

        const order = getState().orderReducer.order;
        const { id, ...postObj } = order;
        await promiAPI.put(`/api/Orders/${order.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'ORDER_UPDATE_SUCCESS',
            payload: order
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

export const updateStandartOrWarehouseComplete = (postObj, reducerObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDERS_COMPLETE_UPDATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.put(`/api/Orders/warehouse/standart/finished/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        const obj = {
            ...reducerObj,
            "userServices": [...reducerObj.userServices, ...response.data]
        }
        dispatch({
            type: 'ORDERS_COMPLETE_UPDATE_SUCCESS',
            payload: obj
        })
    } catch (error) {
        dispatch({
            type: 'ORDERS_COMPLETE_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

//just when updating in UpdateOrderComponent
export const updateNonStandart = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'NON_STANDART_ORDER_UPDATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;

        const order = getState().orderReducer.order;
        const { id, ...postObj } = order;
        const response = await promiAPI.put(`/api/Orders/nonstandart/${order.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        const reducerObj = {
            ...order,
            "orderServices": response.data
        }
        dispatch({
            type: 'NON_STANDART_ORDER_UPDATE_SUCCESS',
            payload: reducerObj
        })
    } catch (error) {
        dispatch({
            type: 'NON_STANDART_ORDER_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


//BASICALLY WHEN PACKING IS CLICKED WE CALL THIS METHOD AND THEN IT WILL TAKE
//MATERIALS FROM MATERIALS WAREHOUSE
export const updateNonStandartOrderComplete = (postObj, reducerObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'NON_STANDART_FINISHED_ORDER_UPDATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.put(`/api/Orders/nonstandart/finished/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        const obj = {
            ...reducerObj,
            "userServices": [...reducerObj.userServices, ...response.data]
        }
        dispatch({
            type: 'NON_STANDART_FINISHED_ORDER_UPDATE_SUCCESS',
            payload: obj
        })
    } catch (error) {
        dispatch({
            type: 'NON_STANDART_FINISHED_ORDER_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateOrderTakeProductsFromWarehouse = (postObj, reducerObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_WAREHOUSE_UPDATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await promiAPI.put(`/api/Orders/warehouse/subtract/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'ORDER_WAREHOUSE_UPDATE_SUCCESS',
            payload: reducerObj
        })
    } catch (error) {
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




