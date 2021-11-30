import promiAPI from "./promiAPI";

export const getMaterialsWarehouse = (callback) =>  async(dispatch,getState)=>{
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
        callback();
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

export const createMaterialWarehouse = (postObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'WAREHOUSE_MATERIALS_CREATE_REQUEST'
        });
        // get token
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/MaterialsWarehouse`,postObj, {headers: {Authorization: `Bearer ${token}`}});
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

export const updateMaterialWarehouse = (postObj,reducerObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'WAREHOUSE_MATERIALS_UPDATE_REQUEST'
        });
        //get token
        const token = getState().usersReducer.currentUser;
        await promiAPI.put(`/api/MaterialsWarehouse/${reducerObj.id}`,postObj,{headers: {Authorization: `Bearer ${token}`}});
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