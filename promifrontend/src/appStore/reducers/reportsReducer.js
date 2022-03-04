
export const reportsReducer = (state = {
    last_month_sold_products: [],
    completed_platforms_orders_by_time: []
}, action) => {
    switch (action.type) {
        case 'REPORTS_LAST_MONTH_SOLD_PRODUCTS_REQUEST':
            return {...state, loading: true}
        case 'REPORTS_LAST_MONTH_SOLD_PRODUCTS_SUCCESS':
            return {...state, loading: false, last_month_sold_products: action.payload }
        case 'REPORTS_LAST_MONTH_SOLD_PRODUCTS_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'REPORTS_PLATFORMS_ORDERS_BY_TIME_REQUEST':
            return {...state, loading: true}
        case 'REPORTS_PLATFORMS_ORDERS_BY_TIME_SUCCESS':
            return {...state, loading: false, completed_platforms_orders_by_time: action.payload }
        case 'REPORTS_PLATFORMS_ORDERS_BY_TIME_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}