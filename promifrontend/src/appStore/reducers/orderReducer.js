export const orderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case 'ORDER_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload }
        case 'ORDER_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'ORDER_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_CREATE_SUCCESS':
            const newOrder = [...state.orders, { ...action.payload }]
            return { ...state, loading: false, orders: newOrder }
        case 'ORDER_CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'ORDER_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_UPDATE_SUCCESS':
            const orders_clone = [...state.orders];
            const updated = orders_clone.map(x => x.id === action.payload.id? action.payload:x)
            return { ...state, loading: false, orders: updated }
        case 'ORDER_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'ORDER_UPDATE_IMAGE_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_UPDATE_IMAGE_SUCCESS':
            const data_clone = [...state.orders];
            const updated_orders = data_clone.map(x => x.id === action.payload.id?action.payload:x)
            return { ...state, loading: false, orders: updated_orders }
        case 'ORDER_UPDATE_IMAGE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'ORDER_WAREHOUSE_UPDATE_REQUEST':
            return {...state, loading: true}
        case 'ORDER_WAREHOUSE_UPDATE_SUCCESS':
            const orders_data = [...state.orders]
            const orders_updated = orders_data.map(x => x.id === action.payload.id?action.payload:x)
            return {...state, loading: false, orders: orders_updated} 
        case 'ORDER_WAREHOUSE_UPDATE_FAIL':
            return {...state, loading:false, error: action.payload}
        default:
            return state;
    }
}