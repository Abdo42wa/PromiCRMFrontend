export const ordersReducer = (state = {orders: []}, action) => {
    switch(action.type){
        case 'ORDERS_FETCH_REQUEST':
            return {...state,loading: true}
        case 'ORDERS_FETCH_SUCCESS':
            return {...state,loading:false, orders: action.payload}
        case 'ORDERS_FETCH_FAIL':
            return {...state,loading:false, error: action.payload}
        default:
            return state;
    }
}