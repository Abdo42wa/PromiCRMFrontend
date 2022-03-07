import promiAPI from "./promiAPI";

// Reikalinga kasmėnesinė ataskaita kas buvo parduota per praėjusį mėnesį.
export const getLastMonthSoldProducts = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'REPORTS_LAST_MONTH_SOLD_PRODUCTS_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get('/api/Orders/reports/last-month/sold', { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'REPORTS_LAST_MONTH_SOLD_PRODUCTS_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'REPORTS_LAST_MONTH_SOLD_PRODUCTS_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
//Ataskaita pagal platforma per pasirinkta laika 
//per kuria daugiausiai parduoda, per kuria maziausiai
export const getCompletedPlatformsOrdersByTime = (queryString) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'REPORTS_PLATFORMS_ORDERS_BY_TIME_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/reports/completed/platforms?${queryString}`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'REPORTS_PLATFORMS_ORDERS_BY_TIME_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'REPORTS_PLATFORMS_ORDERS_BY_TIME_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
export const refreshCompletedPlatformsOrdersByTime = () => async (dispatch, getState) => {
    dispatch({
        type: 'REPORTS_PLATFORMS_ORDERS_BY_TIME_REFRESH'
    })
}

export const getCompletedCountryOrdersByTime = (queryString) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'REPORTS_COUNTRY_ORDERS_BY_TIME_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/reports/completed/countrys?${queryString}`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'REPORTS_COUNTRY_ORDERS_BY_TIME_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'REPORTS_COUNTRY_ORDERS_BY_TIME_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const GetPopularProductByTime = (queryString) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'REPORTS_POPULAR_PRODUCT_BY_TIME_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await promiAPI.get(`/api/Orders/reports/popular/product?${queryString}`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'REPORTS_POPULAR_PRODUCT_BY_TIME_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'REPORTS_POPULAR_PRODUCT_BY_TIME_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const refreshReports = () => async (dispatch, getState) => {
    dispatch({
        type: 'REPORTS_REFRESH'
    })
}
export const refreshReportsProduct = () => async (dispatch, getState) => {
    dispatch({
        type: 'REPORTS_REFRESH_Products'
    })
}