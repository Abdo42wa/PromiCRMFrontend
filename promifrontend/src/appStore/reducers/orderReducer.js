export const orderReducer = (state = { orders: [], non_standart_orders: [], order: null, non_standart_order: null }, action) => {
    switch (action.type) {
        case 'ORDERS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'ORDERS_FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload }
        case 'ORDERS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'NON_STANDART_ORDERS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'NON_STANDART_ORDERS_FETCH_SUCCESS':
            return { ...state, loading: false, non_standart_orders: action.payload }
        case 'NON_STANDART_ORDERS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
            //for standart or warehouse order
        case 'ORDER_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload }
        case 'ORDER_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
            // for Non-standart order fetch
        case 'NON_STANDART_ORDER_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'NON_STANDART_ORDER_FETCH_SUCCESS':
            return { ...state, loading: false, non_standart_order: action.payload }
        case 'NON_STANDART_ORDER_FETCH_FAIL':
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
            const new_order = [...state.non_standart_orders, { ...action.payload }]
            return { ...state, loading: false, non_standart_orders: new_order }
        case 'ORDER_NON_STANDART_CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        //update 'standart' or 'warehouse' orders
        case 'ORDER_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_UPDATE_SUCCESS':
            if (action.payload.orderType === "Ne-standartinis") {
                const n_orders_clone = [...state.non_standart_orders]
                const update_n_t = n_orders_clone.map(x => x.id === action.payload.id ? action.payload : x)
                return { ...state, loading: false, non_standart_orders: update_n_t }
            } else {
                const orders_clone = [...state.orders];
                const updated = orders_clone.map(x => x.id === action.payload.id ? action.payload : x)
                return { ...state, loading: false, orders: updated }
            }

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
        // UPDATE NON-STANDART. simple update that i do in UpdateOrderScreen
        case 'NON_STANDART_ORDER_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'NON_STANDART_ORDER_UPDATE_SUCCESS':
            const orders_d_c = [...state.non_standart_orders]
            const updated_orders_d_c = orders_d_c.map(x => x.id === action.payload.id ? action.payload : x)
            return { ...state, loading: false, non_standart_orders: updated_orders_d_c }
        case 'NON_STANDART_ORDER_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        // UPDATE NON-STANDART. update when packing is clicked and i need 
        //to take materials from materials warehouse
        case 'NON_STANDART_FINISHED_ORDER_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'NON_STANDART_FINISHED_ORDER_UPDATE_SUCCESS':
            const n_orders_d = [...state.non_standart_orders]
            const updated_n_orders_d = n_orders_d.map(x => x.id === action.payload.id ? action.payload : x)
            return { ...state, loading: false, non_standart_orders: updated_n_orders_d }
        case 'NON_STANDART_FINISHED_ORDER_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        //FOR INSERTING MATERIALS
        case 'ORDER_MATERIAL_INSERT_MANY_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_MATERIAL_INSERT_MANY_SUCCESS':
            const order_clone_data = JSON.parse(JSON.stringify(state.non_standart_orders));
            const returnedOrderMaterials = action.payload
            order_clone_data.forEach(element => {
                if (element.id === returnedOrderMaterials[0].orderId) {
                    element.productMaterials = returnedOrderMaterials;
                }
            })
            // const orders_clone_data = [...state.orders]
            // //map through orders each element. return what's already in element
            // const updated_orders_data = orders_clone_data.map(v => ({
            //     ...v, productMaterials: v.id === action.payload[0].orderId?({...action.payload}):v.productMaterials
            // })) 

            return { ...state, loading: false, non_standart_orders: order_clone_data }
        case 'ORDER_MATERIAL_INSERT_MANY_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}