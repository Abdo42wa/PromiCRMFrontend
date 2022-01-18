import promiAPI from "./promiAPI";

export const getWorks = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WORKSCHEDULE_FETCH_REQUEST'
        });
        //get token form usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/WeeklyWorkSchedules`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'WORKSCHEDULE_FETCH_SUCCESS',
            payload: response.data
        });
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

export const getWeekWorks = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'WEEK_WORK_SCHEDULES_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/WeeklyWorkSchedules/works`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'WEEK_WORK_SCHEDULES_FETCH_SUCCESS',
            payload: response.data
        })
    }catch(error){
        dispatch({
            type: 'WEEK_WORK_SCHEDULES_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const addWork = (postObject) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WORKSCHEDULE_CREATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/WeeklyWorkSchedules`, postObject, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'WORKSCHEDULE_CREATE_SUCCESS',
            payload: response.data
        });
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

export const updateWork = (postObj, reducerObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'WORKSCHEDULE_UPDATE_REQUEST'
        });
        //get token from usersReducer
        const token = getState().usersReducer.currentUser;
        await promiAPI.put(`/api/WeeklyWorkSchedules/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'WORKSCHEDULE_UPDATE_SUCCESS',
            payload: reducerObj
        });
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
