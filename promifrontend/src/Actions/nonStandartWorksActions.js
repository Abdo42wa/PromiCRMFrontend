import axios from "axios";

export const getNonStandartWorks = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'NON_STANDART_WORKS_FETCH_REQUEST'
        });
        //get token from users reducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.get(`https://promicrm20211126160923.azurewebsites.net/api/NonStandardWorks`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'NON_STANDART_WORKS_FETCH_SUCCESS',
            payload: response.data
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'NON_STANDART_WORKS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createNonStandartWork = (postObj, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'NON_STANDART_WORKS_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.post(`https://promicrm20211126160923.azurewebsites.net/api/NonStandardWorks`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'NON_STANDART_WORKS_CREATE_SUCCESS',
            payload: response.data
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'NON_STANDART_WORKS_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateNonStandartWork = (postObj, reducerObj, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'NON_STANDART_WORKS_UPDATE_REQUEST'
        });
        // get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.put(`https://promicrm20211126160923.azurewebsites.net/api/NonStandardWorks/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'NON_STANDART_WORKS_UPDATE_SUCCESS',
            payload: reducerObj
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'NON_STANDART_WORKS_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}