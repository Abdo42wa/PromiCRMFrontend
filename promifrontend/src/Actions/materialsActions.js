import axios from 'axios'
export const getMaterials = (callback) => async(dispatch,getState) =>{
    try{
        dispatch({
            type: 'MATERIALS_FETCH_REQUEST'
        });
        //getting token from usersReducer state
        const token = getState().usersReducer.currentUser;
        const response = await axios.get(`/api/Materials`, {headers: { Authorization: `Bearer ${token}` }})
        dispatch({
            type: 'MATERIALS_FETCH_SUCCESS',
            payload: response.data
        });
        callback();
    }catch (error) {
        dispatch({
            type: 'MATERIALS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createMaterial = (postObject,callback) => async(dispatch,getState) =>{
    try{
        dispatch({
            type: 'MATERIALS_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.post(`/api/Materials`, postObject, {headers:{Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'MATERIALS_CREATE_SUCCESS',
            payload: postObject
        });
        callback();
    }catch (error) {
        dispatch({
            type: 'MATERIALS_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateItem = (id, postObj, callback) => async(dispatch,getState) => {
    try{
        dispatch({
            type: 'MATERIAL_UPDATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.put(`/api/Materials/${id}`,postObj, {headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'MATERIAL_UPDATE_SUCCESS',
            payload: postObj
        });
        callback();
    }catch (error) {
        dispatch({
            type: 'MATERIAL_UPDATE_SUCCESS',
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