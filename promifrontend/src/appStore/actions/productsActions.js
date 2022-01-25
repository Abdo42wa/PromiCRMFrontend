import promiAPI from './promiAPI';

export const getProducts = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'PRODUCTS_FETCH_REQUEST'
        });
        //get token form usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Products`, { headers: { Authorization: `Bearer ${token}` } })
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

export const getProductsByOrder = (orderId) => async(dispatch,getState) => {
    try{
        dispatch({
            type: 'PRODUCTS_BY_ORDER_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Products/order/${orderId}`,{headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'PRODUCTS_BY_ORDER_FETCH_SUCCESS',
            payload: response.data
        })
    }catch (error) {
        dispatch({
            type: 'PRODUCTS_BY_ORDER_FETCH_FAIL',
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
        const response = await promiAPI.post(`/api/Products`, postObject, { headers: {Authorization: `Bearer ${token}`,'Content-Type': 'multipart/form-data'} });
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
        const response = await promiAPI.put(`/api/Products/${reducerObj.id}`, postObj, {headers: {Authorization: `Bearer ${token}`}});
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

export const updateProductWithImage = (postObj,id,callback) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'PRODUCTS_IMAGE_UPDATE_REQUEST'
        });
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.put(`/api/Products/image/${id}`,postObj, {headers: {Authorization: `Bearer ${token}`,'Content-Type': 'multipart/form-data'}})
        dispatch({
            type: 'PRODUCTS_IMAGE_UPDATE_SUCCESS',
            payload: response.data
        });
        callback();
    }catch (error) {
        dispatch({
            type: 'PRODUCTS_IMAGE_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

//PRODUCT MATERIALS -----------------------------------ACTIONS
//fetch is only for purpose of deleting data from modified_product_materials. on load
export const getProductMaterials = (productMaterials) => async(dispatch,getState)=>{
    dispatch({
        type: 'MATERIALS_PRODUCT_FETCH_SUCCESS',
        payload: productMaterials
    })
}


export const addProductMaterial = (obj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'MATERIALS_PRODUCT_ADD_SUCCESS',
            payload: obj
        })
    }catch (error) {
        dispatch({
            type: 'MATERIALS_PRODUCT_ADD_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateProductMaterial = (obj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'MATERIALS_PRODUCT_UPDATE_SUCCESS',
            payload: obj
        })
    }catch (error) {
        dispatch({
            type: 'MATERIALS_PRODUCT_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

//delete product material
export const deleteProductMaterial = (id) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'MATERIALS_PRODUCT_DELETE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await promiAPI.delete(`/api/ProductMaterials/${id}`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'MATERIALS_PRODUCT_DELETE_SUCCESS',
            payload: id
        })
    }catch (error) {
        dispatch({
            type: 'MATERIALS_PRODUCT_DELETE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateManyMaterials = (postObj,callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'PRODUCT_MATERIAL_UPDATE_MANY_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.put(`/api/ProductMaterials/update/products`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'PRODUCT_MATERIAL_UPDATE_MANY_SUCCESS',
            payload: response.data
        });
        callback()
    } catch (error) {
        dispatch({
            type: 'PRODUCT_MATERIAL_UPDATE_MANY_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}