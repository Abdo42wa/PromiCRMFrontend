import promiAPI from "./promiAPI";

export const getSalesChannels = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'SALES_CHANNELS_FETCH_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/SalesChannels`,{headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'SALES_CHANNELS_FETCH_SUCCESS',
            payload: response.data
        })  
    }catch (error) {
        dispatch({
            type: 'SALES_CHANNELS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createSalesChannel = (postObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'SALES_CHANNELS_CREATE_REQUEST'
        });
        //GET TOKEN
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/SalesChannels`,postObj, {headers: {Authorization: `Bearer ${token} `}})
        dispatch({
            type: 'SALES_CHANNELS_CREATE_SUCCESS',
            payload: response.data
        });
    }catch (error) {
        dispatch({
            type: 'SALES_CHANNELS_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateSalesChannel = (postObj,reducerObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'SALES_CHANNELS_UPDATE_REQUEST'
        });
        //get token
        const token = getState().usersReducer.currentUser;
        await promiAPI.put(`/api/SalesChannels/${reducerObj.id}`,postObj,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'SALES_CHANNELS_UPDATE_SUCCESS',
            payload: reducerObj
        })
    }catch (error) {
        dispatch({
            type: 'SALES_CHANNELS_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

