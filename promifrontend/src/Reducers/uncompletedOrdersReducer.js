export const uncompletedOrdersReducer = (state = {uncompletedOrders: [], uncompletedExpressOrders: []},action)=>{
    switch(action.type){
        case 'UNCOMPLETED_ORDERS_FETCH_REQUEST':
            return {...state, loading: true}
        case 'UNCOMPLETED_ORDERS_FETCH_SUCCESS':
            return {...state, loading: false, uncompletedOrders: action.payload}
        case 'UNCOMPLETED_ORDERS_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_REQUEST':
            return {...state, loading: true}
        case 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_SUCCESS':
            return {...state, loading: false, uncompletedExpressOrders: action.payload}
        case 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}