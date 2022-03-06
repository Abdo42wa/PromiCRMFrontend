import promiAPI from "./promiAPI"

export const getUncompletedOrdersByPlatforms = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'UNCOMPLETED_ORDERS_BY_PLATFORMS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser
        const response = await promiAPI.get(`/api/Orders/uncompleted/by-platform`, {headers: {Authorization: `Beaerer ${token}`}})
        dispatch({
            type: 'UNCOMPLETED_ORDERS_BY_PLATFORMS_FETCH_SUCCESS',
            payload: response.data
        })
    }catch (error) {
        dispatch({
            type: 'UNCOMPLETED_ORDERS_BY_PLATFORMS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}



// -------------------------------- DASHBOARD

export const getUncompletedOrdersTimes = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDERS_UNCOMPLETED_TIMES_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get('/api/Orders/planned/time', { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'ORDERS_UNCOMPLETED_TIMES_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'ORDERS_UNCOMPLETED_TIMES_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


//MAIN DASHBOARD (FIRST)-------------------------------
//Laukiantys gaminiai
export const getMainPendingProducts = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'MAIN_PENDING_PRODUCTS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/main/pendingproducts`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'MAIN_PENDING_PRODUCTS_FETCH_SUCCESS',
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: 'MAIN_PENDING_PRODUCTS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
//Butina siandien atlitki. These are orders whose deadline is today or they are late
export const getNecessaryToMakeToday = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'MAIN_NECESSARY_TODAY_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/main/necessary/make/today`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'MAIN_NECESSARY_TODAY_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'MAIN_NECESSARY_TODAY_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
//Siandien pagaminti(main dashboard). orders that are made today.
export const getTodayMadeProducts = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'MAIN_TODAY_MADE_PRODUCTS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get('/api/Orders/today/made/products', { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'MAIN_TODAY_MADE_PRODUCTS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'MAIN_TODAY_MADE_PRODUCTS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
//Nauji uzsakyti gaminiai (main dashboard). today made orders (no  completed).
export const getMainTodayNewOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'MAIN_TODAY_NEW_PRODUCTS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/main/new/orders`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'MAIN_TODAY_NEW_PRODUCTS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'MAIN_TODAY_NEW_PRODUCTS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const getUnsendedOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDERS_UNSENDED_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get('/api/Orders/unsended', { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'ORDERS_UNSENDED_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'ORDERS_UNSENDED_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
export const getRecommendedForProductionOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDERS_RECOMMENDED_FOR_PRODUCTION_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get('/api/Orders/recommendedforproduction', { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'ORDERS_RECOMMENDED_FOR_PRODUCTION_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'ORDERS_RECOMMENDED_FOR_PRODUCTION_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


//----------------------------------------



export const getUrgentOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDERS_URGENT_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/urgent`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'ORDERS_URGENT_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'ORDERS_URGENT_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getRecentOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDERS_RECENT_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/recent`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'ORDERS_RECENT_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'ORDERS_RECENT_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getUncompletedWarehouseOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'UNCOMPLETED_WAREHOUSE_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/warehouseUncompleted`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'UNCOMPLETED_WAREHOUSE_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'UNCOMPLETED_WAREHOUSE_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

}


export const getUncompletedExpressOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/express`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const getOrdersUncompleted = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'UNCOMPLETED_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/uncompleted`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'UNCOMPLETED_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'UNCOMPLETED_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getClientsOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'CLIENT_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/clients`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'CLIENT_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'CLIENT_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getLastWeeksCompletedOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'LAST_WEEKS_ORDERS_FETCH_REQUEST'
        });
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/weeksOrders`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: 'LAST_WEEKS_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'LAST_WEEKS_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getLastMonthCompletedOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'LAST_MONTH_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/monthOrders`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'LAST_MONTH_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'LAST_MONTH_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const getEmployeeMadeProducts = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'EMPLOYEE_ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/employee/products`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'EMPLOYEE_ORDERS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'EMPLOYEE_ORDERS_FETCH_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}