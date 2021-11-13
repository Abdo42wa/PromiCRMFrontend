import axios from "axios";

export const getShipments = (callback) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'SHIPMENTS_FETCH_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.get(`/api/Shipments`, {headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'SHIPMENTS_FETCH_SUCCESS',
            payload: response.data
        });
        callback();
    }catch (error) {
        dispatch({
            type: 'SHIPMENTS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createShipment = (postObj, callback) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'SHIPMENTS_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.post(`/api/Shipments`,postObj, {headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'SHIPMENTS_CREATE_SUCCESS',
            payload: response.data
        });
        callback();
    }catch (error) {
        dispatch({
            type: 'SHIPMENTS_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateShipment = (postObj,reducerObj,callback) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'SHIPMENT_UPDATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.put(`/api/Shipments/${reducerObj.id}`,postObj, {headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'SHIPMENT_UPDATE_SUCCESS',
            payload: reducerObj
        });
        callback();
    }catch (error) {
        dispatch({
            type: 'SHIPMENT_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


