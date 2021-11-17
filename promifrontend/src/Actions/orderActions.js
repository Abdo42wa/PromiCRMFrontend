import axios from "axios";

export const getOrders = (callback) => async(dispatch, getState) =>{
    try{
        dispatch({
            type: 'ORDERS_FETCH_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.get(`/api/Orders`, {headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'ORDERS_FETCH_SUCCESS',
            payload: response.data
        });
        callback();
    }catch (error) {
        dispatch({
            type: 'ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}