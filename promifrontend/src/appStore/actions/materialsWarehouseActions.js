import promiAPI from "./promiAPI";

export const getMaterialsWarehouseData = () =>  async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'WAREHOUSE_MATERIALS_FETCH_REQUEST'
        });
        //get token
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/MaterialsWarehouse`,{headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'WAREHOUSE_MATERIALS_FETCH_SUCCESS',
            payload: response.data
        });
    }catch (error) {
        dispatch({
            type: 'WAREHOUSE_MATERIALS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createMaterialWarehouseData = (postObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'WAREHOUSE_MATERIALS_CREATE_REQUEST'
        });
        // get token
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/MaterialsWarehouse`,postObj, {headers:{Authorization: `Bearer ${token}`,'Content-Type': 'multipart/form-data'}});
        console.log('response data:'+JSON.stringify(response.data))
        dispatch({
            type: 'WAREHOUSE_MATERIALS_CREATE_SUCCESS',
            payload: response.data
        });
    }catch (error) {
        dispatch({
            type: 'WAREHOUSE_MATERIALS_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateMaterialWarehouseData = (postObj,reducerObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'WAREHOUSE_MATERIALS_UPDATE_REQUEST'
        });
        //get token
        const token = getState().usersReducer.currentUser;
        await promiAPI.put(`/api/MaterialsWarehouse/${reducerObj.id}`,postObj,{headers: {Authorization: `Bearer ${token}`,'Content-Type': 'multipart/form-data'}});
        dispatch({
            type: 'WAREHOUSE_MATERIALS_UPDATE_SUCCESS',
            payload: reducerObj
        })
    }catch (error) {
        dispatch({
            type: 'WAREHOUSE_MATERIALS_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateMaterialWarehouseWithImage = (postObj,id) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'WAREHOUSE_MATERIALS_UPDATE_WITH_IMAGE_REQUEST'
        });
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.put(`/api/MaterialsWarehouse/image/${id}`,postObj, {headers: {Authorization: `Bearer ${token}`,'Content-Type': 'multipart/form-data'}})
        dispatch({
            type: 'WAREHOUSE_MATERIALS_UPDATE_WITH_IMAGE_SUCCESS',
            payload: response.data
        });
    }catch (error) {
        dispatch({
            type: 'WAREHOUSE_MATERIALS_UPDATE_WITH_IMAGE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteMaterialImage = (id,fileName) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'WAREHOUSE_MATERIALS_IMAGE_DELETE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await promiAPI.delete(`/api/BlobFiles/${fileName}`,{headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'WAREHOUSE_MATERIALS_IMAGE_DELETE_SUCCESS',
            payload: id
        });
    }catch (error) {
        dispatch({
            type: 'WAREHOUSE_MATERIALS_IMAGE_DELETE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateManyWarehouseMaterials = (postObj,callback) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'WAREHOUSE_MATERIALS_UPDATE_MANY_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await promiAPI.put(`/api/MaterialsWarehouse/update`,postObj, {headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'WAREHOUSE_MATERIALS_UPDATE_MANY_SUCCESS',
            payload: postObj
        })
        callback();
    }catch (error) {
        dispatch({
            type: 'WAREHOUSE_MATERIALS_UPDATE_MANY_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}