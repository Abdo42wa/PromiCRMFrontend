import promiAPI from "./promiAPI";

export const getBonuses = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'BONUSES_FETCH_REQUEST'
        });
        //get user token
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Bonuses`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'BONUSES_FETCH_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'BONUSES_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getMonthMadeProducts = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'BONUSES_MONTH_MADE_PRODUCTS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get('/api/UserServices/month/madeProducts',{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'BONUSES_MONTH_MADE_PRODUCTS_FETCH_SUCCESS',
            payload: response.data
        })
    }catch (error) {
        dispatch({
            type: 'BONUSES_MONTH_MADE_PRODUCTS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getUsersMonthOperations = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'BONUSES_USERS_MONTH_OPERATIONS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get('/api/UserServices/month/madeOperations', {headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'BONUSES_USERS_MONTH_OPERATIONS_FETCH_SUCCESS',
            payload: response.data
        })
    }catch (error) {
        dispatch({
            type: 'BONUSES_USERS_MONTH_OPERATIONS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createBonus = (postObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'BONUSES_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/Bonuses`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'BONUSES_CREATE_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'BONUSES_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateBonus = (postObj, reducerObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'BONUSES_UPDATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.put(`/api/Bonuses/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'BONUSES_UPDATE_SUCCESS',
            payload: reducerObj
        });
    } catch (error) {
        dispatch({
            type: 'BONUSES_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}