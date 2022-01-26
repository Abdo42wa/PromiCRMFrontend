export const orderDetailsReducer = (state = {
    uncompleted_orders_times: [],
    completed_warehouse_orders: [],
    uncompleted_express_orders: [],
    uncompleted_warehouse_orders: [],
    uncompleted_orders: [],
    clients_orders: [],
    last_weeks_orders: [],
    last_month_orders: [],
    urgent_orders: [],
    recent_orders: []
}, action) => {
    switch (action.type) {
        //uncompletedOrders: [],
        case 'ORDERS_UNCOMPLETED_TIMES_FETCH_REQUEST':
            return {...state, loading: true}
        case 'ORDERS_UNCOMPLETED_TIMES_FETCH_SUCCESS':
            return {...state, loading: false, uncompleted_orders_times: action.payload}
        case 'ORDERS_UNCOMPLETED_TIMES_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'COMPLETED_WAREHOUSE_ORDERS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'COMPLETED_WAREHOUSE_ORDERS_FETCH_SUCCESS':
            return { ...state, loading: false, completed_warehouse_orders: action.payload }
        case 'COMPLETED_WAREHOUSE_ORDERS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_SUCCESS':
            const uncompleted_express_orders = action.payload;
            return { ...state, loading: false, uncompleted_express_orders: uncompleted_express_orders }
        case 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'UNCOMPLETED_WAREHOUSE_ORDERS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'UNCOMPLETED_WAREHOUSE_ORDERS_FETCH_SUCCESS':
            const uncompleted_warehouse_orders = action.payload;
            return { ...state, loading: false, uncompleted_warehouse_orders: uncompleted_warehouse_orders }
        case 'UNCOMPLETED_WAREHOUSE_ORDERS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'UNCOMPLETED_ORDERS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'UNCOMPLETED_ORDERS_FETCH_SUCCESS':
            return { ...state, loading: false, uncompleted_orders: action.payload }
        case 'UNCOMPLETED_ORDERS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'CLIENT_ORDERS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'CLIENT_ORDERS_FETCH_SUCCESS':
            return { ...state, loading: false, clients_orders: action.payload }
        case 'CLIENT_ORDERS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'LAST_WEEKS_ORDERS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'LAST_WEEKS_ORDERS_FETCH_SUCCESS':
            return { ...state, loading: false, last_weeks_orders: action.payload }
        case 'LAST_WEEKS_ORDERS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'LAST_MONTH_ORDERS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'LAST_MONTH_ORDERS_FETCH_SUCCESS':
            return { ...state, loading: false, last_month_orders: action.payload }
        case 'LAST_MONTH_ORDERS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'ORDERS_URGENT_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'ORDERS_URGENT_FETCH_SUCCESS':
            return { ...state, loading: false, urgent_orders: action.payload }
        case 'ORDERS_URGENT_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'ORDERS_RECENT_FETCH_REQUEST':
            return {...state, loading: true}
        case 'ORDERS_RECENT_FETCH_SUCCESS':
            return {...state, loading: false, recent_orders: action.payload}
        case 'ORDERS_RECENT_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}