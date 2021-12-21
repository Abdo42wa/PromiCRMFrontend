export const uncompletedOrdersReducer = (state = { uncompleted_express_orders: []},action)=>{
    switch(action.type){
        //uncompletedOrders: [],
        // case 'UNCOMPLETED_ORDERS_FETCH_REQUEST':
        //     return {...state, loading: true}
        // case 'UNCOMPLETED_ORDERS_FETCH_SUCCESS':
        //     return {...state, loading: false, uncompletedOrders: action.payload}
        // case 'UNCOMPLETED_ORDERS_FETCH_FAIL':
        //     return {...state, loading: false, error: action.payload}
        case 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_REQUEST':
            return {...state, loading: true}
        case 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_SUCCESS':
            const uncompleted_express_orders = action.payload;
            return {...state, loading: false, uncompleted_express_orders: uncompleted_express_orders}
        case 'UNCOMPLETED_EXPRESS_ORDERS_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}