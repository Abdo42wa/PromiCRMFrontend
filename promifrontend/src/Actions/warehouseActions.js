import promiAPI from "./promiAPI";

export const getWarehouseData = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WAREHOUSES_FETCH_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/WarehouseCountings`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'WAREHOUSES_FETCH_SUCCESS',
            payload: response.data
        });
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

export const getWarehouseProducts = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'WAREHOUSES_PRODUCTS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/WarehouseCountings/products`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'WAREHOUSES_PRODUCTS_FETCH_SUCCESS',
            payload: response.data
        })
    }catch(error){
        dispatch({
            type: 'WAREHOUSES_PRODUCTS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
        
    }
}

export const getWarehouseProduct = (productCodde) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WAREHOUSES_FETCH_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/WarehouseCountings/product/${productCodde}`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'WAREHOUSES_FETCH_SUCCESS',
            payload: response.data
        });
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
export const checkWarehouseProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WAREHOUSES_FETCH_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/WarehouseCountings/productID/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'WAREHOUSES_FETCH_SUCCESS',
            payload: response.data
        });
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

// for orders. when making order to warehouse. we want to add to warehouse if it doesnt exist. if exidt update
export const createOrUpdateWarehouseData = (postObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WAREHOUSES_CREATE_UPDATE_REQUEST'
        });
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/WarehouseCountings/insert/update`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'WAREHOUSES_CREATE_UPDATE_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'WAREHOUSES_CREATE_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}



export const createWarehouseData = (postObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WAREHOUSES_CREATE_REQUEST'
        });
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/WarehouseCountings`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'WAREHOUSES_CREATE_SUCCESS',
            payload: response.data
        });
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


export const updateWarehouseData = (postObj, reducerObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WAREHOUSES_UPDATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.put(`/api/WarehouseCountings/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'WAREHOUSES_UPDATE_SUCCESS',
            payload: reducerObj
        });
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


export const updateWarehouseWithImg = (postObj, id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WAREHOUSES_UPDATE_IMAGE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.put(`/api/WarehouseCountings/image/${id}`, postObj, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
        dispatch({
            type: 'WAREHOUSES_UPDATE_IMAGE_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'WAREHOUSES_UPDATE_IMAGE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}