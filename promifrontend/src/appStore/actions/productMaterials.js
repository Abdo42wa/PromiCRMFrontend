import promiAPI from './promiAPI';
export const getMaterials = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'MATERIALS_FETCH_REQUEST'
        });
        //getting token from usersReducer state
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/ProductMaterials`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'MATERIALS_FETCH_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'MATERIALS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getMaterialsByProduct = (id,callback) => async(dispatch,getState)=>{
    try {
        dispatch({
            type: 'MATERIALS_PRODUCT_FETCH_REQUEST'
        });
        //getting token from usersReducer state
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/ProductMaterials/product/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'MATERIALS_PRODUCT_FETCH_SUCCESS',
            payload: response.data
        });
        callback()
    } catch (error) {
        dispatch({
            type: 'MATERIALS_PRODUCT_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createMaterial = (postObject) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'MATERIALS_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/ProductMaterials`, postObject, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'MATERIALS_CREATE_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'MATERIALS_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateItem = (postObj, reducerObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'MATERIAL_UPDATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.put(`/api/ProductMaterials/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'MATERIAL_UPDATE_SUCCESS',
            payload: reducerObj
        });
    } catch (error) {
        dispatch({
            type: 'MATERIAL_UPDATE_SUCCESS',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}



export const updateManyMaterials = (postObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'MATERIAL_UPDATE_MANY_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        await promiAPI.put(`/api/ProductMaterials/update`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'MATERIAL_UPDATE_MANY_SUCCESS',
            payload: postObj
        });
    } catch (error) {
        dispatch({
            type: 'MATERIAL_UPDATE_MANY_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


// export const updateItems = (postObject, callback) => async(dispatch,getState) =>{
//     try{
//         dispatch({
//             type: 'MATERIALS_UPDATE_REQUEST'
//         });
//         //get token from usersReducer
//         const token = getState().usersReducer.currentUser;
//         const response = await axios.put(`/api/`)
//     }catch (error) {
//         dispatch({
//             type: 'MATERIALS_UPDATE_FAIL',
//             payload:
//                 error.response && error.response.data.message
//                     ? error.response.data.message
//                     : error.message,
//         })
//     }
// }