import axios from 'axios'

export const getProducts = (callback) => async(dispatch,getState) =>{
    try{
        dispatch({
            type: 'PRODUCTS_FETCH_REQUEST'
        });
        //get token form usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.get(`/api/Products`, {headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'PRODUCTS_FETCH_SUCCESS',
            payload: response.data
        });
        console.log('Productsa action:'+JSON.stringify(response.data))
        callback()
    }catch (error) {
        dispatch({
            type: 'PRODUCTS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

}