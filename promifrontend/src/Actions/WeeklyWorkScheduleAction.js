import axios from 'axios'

export const getWorks = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WORKSCHEDULE_FETCH_REQUEST'
        });
        //get token form usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.get(`/api/WeeklyWorkSchedules`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'WORKSCHEDULE_FETCH_SUCCESS',
            payload: response.data
        });
        callback()
    } catch (error) {
        dispatch({
            type: 'WORKSCHEDULE_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const addWork = (postObject, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WORKSCHEDULE_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.post(`https://localhost:44324/api/WeeklyWorkSchedules`, postObject, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'WORKSCHEDULE_CREATE_SUCCESS',
            payload: response.data
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'WORKSCHEDULE_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateWork = (postObj, reducerObj, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WORKSCHEDULE_UPDATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await axios.put(`https://localhost:44324/api/WeeklyWorkSchedules/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'WORKSCHEDULE_UPDATE_SUCCESS',
            payload: reducerObj
        });
        callback();
    } catch (error) {
        dispatch({
            type: 'WORKSCHEDULE_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
