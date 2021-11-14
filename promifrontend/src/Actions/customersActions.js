import axios from "axios";

export const getCustomers = (callback) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'CUSTOMERS_FETCH_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.get(`/api/Customers`, {headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'CUSTOMERS_FETCH_SUCCESS',
            payload: response.data
        });
        callback();
    }catch (error) {
        dispatch({
            type: 'CUSTOMERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createCustomer = (postObj,callback) => async(dispatch,getState) =>{
    try{
        dispatch({
            type: 'CUSTOMERS_CREATE_REQUEST'
        });
        //getting token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.post(`/api/Customers`,postObj,{headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'CUSTOMERS_CREATE_SUCCESS',
            payload: response.data
        });
        callback();
    }catch (error) {
        dispatch({
            type: 'CUSTOMERS_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateCustomer = (postObj,reducerObj, callback) => async(dispatch,getState) =>{
    try{
        dispatch({
            type: 'CUSTOMERS_UPDATE_REQUEST'
        });
        //getting token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.put(`/api/Customers/${reducerObj.id}`,postObj, {headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'CUSTOMERS_UPDATE_SUCCESS',
            payload: reducerObj
        });
        callback();
    }catch (error) {
        dispatch({
            type: 'CUSTOMERS_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}