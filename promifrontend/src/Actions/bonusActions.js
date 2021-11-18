import axios from "axios";

export const getBonuses = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'BONUSES_FETCH_REQUEST'
        });
        //get user token
        const token = getState().usersReducer.currentUser;
        const response = await axios.get(`/api/Bonus`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'BONUSES_FETCH_SUCCESS',
            payload: response.data
        });
        callback();
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

export const createBonus = (postObj, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'BONUSES_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.post(`/api/Bonus`,postObj, {headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'BONUSES_CREATE_SUCCESS',
            payload: response.data
        });
        callback();
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


export const updateBonus = (postObj,reducerObj,callback) => async(dispatch,getState) => {
    try{
        dispatch({
            type: 'BONUSES_UPDATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.put(`/api/Bonus/${reducerObj.id}`,postObj, {headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'BONUSES_UPDATE_SUCCESS',
            payload: reducerObj
        });
        callback();
    }catch (error) {
        dispatch({
            type: 'BONUSES_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}