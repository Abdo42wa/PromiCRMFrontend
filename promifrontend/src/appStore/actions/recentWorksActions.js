import promiAPI from "./promiAPI";

export const getRecentWorks = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'RECENT_WORKS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/RecentWorks`,{headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'RECENT_WORKS_FETCH_SUCCESS',
            payload: response.data
        })
    }catch (error) {
        dispatch({
            type: 'RECENT_WORKS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const createRecentWork = (postObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'RECENT_WORKS_CREATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.post(`/api/RecentWorks`,postObj, {headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'RECENT_WORKS_CREATE_SUCCESS',
            payload: response.data
        })
    }catch (error) {
        dispatch({
            type: 'RECENT_WORKS_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateRecentWork = (postObj,reducerObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'RECENT_WORKS_UPDATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await promiAPI.put(`/api/RecentWorks/${reducerObj.id}`,postObj, {headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'RECENT_WORKS_UPDATE_SUCCESS',
            payload: reducerObj
        })
    }catch (error) {
        dispatch({
            type: 'RECENT_WORKS_UPDATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteRecentWork = (id) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'RECENT_WORKS_DELETE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await promiAPI.delete(`/api/RecentWorks/${id}`,{headers: {Authorization: `Bearer ${token}`}});
        dispatch({
            type: 'RECENT_WORKS_DELETE_SUCCESS'
        })
    }catch (error) {
        dispatch({
            type: 'RECENT_WORKS_DELETE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}