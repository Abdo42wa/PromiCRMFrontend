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
            // CREATE NON-STANDART ORDER
        case 'ORDER_NON_STANDART_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_NON_STANDART_CREATE_SUCCESS':
            const new_order = [...state.orders, { ...action.payload }]
            return { ...state, loading: false, orders: new_order }
        case 'ORDER_NON_STANDART_CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        //update 'standart' or 'warehouse' orders
        case 'ORDER_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_UPDATE_SUCCESS':
            const orders_clone = [...state.orders];
            const updated = orders_clone.map(x => x.id === action.payload.id ? action.payload : x)
            return { ...state, loading: false, orders: updated }
        case 'ORDER_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'ORDER_UPDATE_IMAGE_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_UPDATE_IMAGE_SUCCESS':
            const data_clone = [...state.orders];
            const updated_orders = data_clone.map(x => x.id === action.payload.id ? action.payload : x)
            return { ...state, loading: false, orders: updated_orders }
        case 'ORDER_UPDATE_IMAGE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'ORDER_WAREHOUSE_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_WAREHOUSE_UPDATE_SUCCESS':
            const orders_data = [...state.orders]
            const orders_updated = orders_data.map(x => x.id === action.payload.id ? action.payload : x)
            return { ...state, loading: false, orders: orders_updated }
        case 'ORDER_WAREHOUSE_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        //FOR INSERTING MATERIALS
        case 'ORDER_MATERIAL_INSERT_MANY_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_MATERIAL_INSERT_MANY_SUCCESS':
            const order_clone_data = JSON.parse(JSON.stringify(state.orders));
            const returnedOrderMaterials = action.payload
            order_clone_data.forEach(element => {
                if (element.id === returnedOrderMaterials[0].orderId) {
                    element.productMaterials = returnedOrderMaterials;
                }
            })

            return { ...state, loading: false, orders: order_clone_data }
        case 'ORDER_MATERIAL_INSERT_MANY_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}