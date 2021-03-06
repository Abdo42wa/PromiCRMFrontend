import moment from 'moment'
export const orderReducer = (state = { orders: [], non_standart_orders: [], order: null, orderNumber: null }, action) => {
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
            return { ...state, loading: false, order: {...action.payload, "orderFinishDate": moment(action.payload.orderFinishDate).format('YYYY/MM/DD')} }
        case 'ORDER_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        // for Non-standart order fetch
        case 'NON_STANDART_ORDER_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'NON_STANDART_ORDER_FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload }
        case 'NON_STANDART_ORDER_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        //FETCH MAX ORDER NUMBER
        case 'ORDERS_ORDER_NUMBER_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'ORDERS_ORDER_NUMBER_FETCH_SUCCESS':
            let number = action.payload;
            if (action.payload === null || action.payload === undefined)
                number = 1;
            else
                number = number + 1;
            return { ...state, loading: false, orderNumber: number }
        case 'ORDERS_ORDER_NUMBER_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        //FOR updateOrderComponent. updating Standart or Warehouse
        case 'ORDER_OBJ_UPDATE_SUCCESS':
            const order_clone = state.order;
            if (action.payload.orderType === "Ne-standartinis") {
                //check if we update quantity or not
                if (action.payload.name === "quantity") {
                    //order=>orderServices
                    let time = 0;
                    for (let a = 0; a < order_clone.orderServices.length; a++)
                        time += order_clone.orderServices[a].timeConsumption
                    // time = time * action.payload.value
                    return { ...state, loading: false, order: { ...state.order, [action.payload.name]: action.payload.value, "productionTime": time } }
                } else {
                    return { ...state, loading: false, order: { ...state.order, [action.payload.name]: action.payload.value } }
                }
            } else {
                if (action.payload.name === "quantity") {
                    //order=>product=>orderServices
                    let time = 0;
                    for (let a = 0; a < order_clone.product.orderServices.length; a++)
                        time += order_clone.product.orderServices[a].timeConsumption
                    time = time * action.payload.value
                    return {...state, loading: false, order: {...state.order, [action.payload.name]:action.payload.value, "productionTime":time}}
                } else {
                    return { ...state, loading: false, order: { ...state.order, [action.payload.name]: action.payload.value } }
                }

            }
        case 'ORDER_NON_STANDART_OBJ_SERVICE_UPDATE':
            const n_s_order_obj = state.order;
            if (action.payload.record === null) {
                console.log('RECORD DOESNT EXIST:' + JSON.stringify(action.payload))
                const obj = { serviceId: action.payload.serviceId, timeConsumption: action.payload.value, orderId: n_s_order_obj.id }
                const new_n_s_order_services = [...n_s_order_obj.orderServices, { ...obj }]
                
                //recount productionTime
                let time = 0;
                for(let a=0;a<new_n_s_order_services.length;a++)
                    time += new_n_s_order_services[a].timeConsumption
                // time = time * n_s_order_obj.quantity 

                const updated_n_s_order_obj = { ...n_s_order_obj, "orderServices": new_n_s_order_services, "productionTime":time }
                return { ...state, loading: false, order: updated_n_s_order_obj }
            } else {
                // const index = n_s_order_obj.orderServices.findIndex(x => x.id === action.payload.id)
                const updated_obj_services = n_s_order_obj.orderServices.map(x => x.serviceId === action.payload.serviceId ? { ...x, "timeConsumption": action.payload.value } : x)
                
                //recount productionTime
                let time = 0;
                for(let a=0;a<updated_obj_services.length;a++)
                    time += updated_obj_services[a].timeConsumption
                // time = time * n_s_order_obj.quantity
                
                const updated_n_s_order = { ...state.order, "orderServices": updated_obj_services, "productionTime":time }
                return { ...state, loading: false, order: updated_n_s_order }
            }
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
            const updated_orders_d_c = orders_d_c.map(x => x.id === action.payload.id ? {...action.payload, "userServices":x.userServices} : x)
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
            return { ...state, loading: false, non_standart_orders: order_clone_data }
        case 'ORDER_MATERIAL_INSERT_MANY_FAIL':
            return { ...state, loading: false, error: action.payload }
        //CREATE UserService for NON STANDART ORDER ------------------
        case 'NON_STANDART_ORDER_SERVICE_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'NON_STANDART_ORDER_SERVICE_CREATE_SUCCESS':
            const orders_n_clone = [...state.non_standart_orders]
            const order_n = orders_n_clone.find(x => x.id === action.payload.orderId)
            const new_order_services = { ...order_n, "userServices": [...order_n.userServices, { ...action.payload }] }
            const updated_n_orders = orders_n_clone.map(v => v.id === action.payload.orderId ? new_order_services : v)
            // console.log(JSON.stringify(new_orders_services))
            return { ...state, loading: false, non_standart_orders: updated_n_orders }
        case 'NON_STANDART_ORDER_SERVICE_CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'NON_STADARNT_ORDER_SERVICE_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'NON_STADARNT_ORDER_SERVICE_UPDATE_SUCCESS':
            const n_standart_orders = [...state.non_standart_orders]
            const updated_n_standart_orders = n_standart_orders ? n_standart_orders.map(
                v => v.id === action.payload.orderId ? ({
                    ...v, userServices: v.userServices.map(
                        s => s.id === action.payload.id ? ({ ...s, "userId": action.payload.userId }) : s
                    )
                }) : v
            ) : []
            return { ...state, loading: false, non_standart_orders: updated_n_standart_orders }
        case 'NON_STADARNT_ORDER_SERVICE_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'ORDER_SERVICE_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_SERVICE_CREATE_SUCCESS':
            const orders_s_clone = [...state.orders]
            const order_s = orders_s_clone.find(x => x.id === action.payload.orderId)
            const order_s_services = { ...order_s, "userServices": [...order_s.userServices, { ...action.payload }] }
            const updated_s_orders = orders_s_clone.map(x => x.id === action.payload.orderId ? order_s_services : x)
            return { ...state, loading: false, orders: updated_s_orders }
        case 'ORDER_SERVICE_CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'ORDER_SERVICE_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_SERVICE_UPDATE_SUCCESS':
            const orders_standart_clone = [...state.orders]
            const updated_standart_orders_d = orders_standart_clone ? orders_standart_clone.map(
                v => v.id === action.payload.orderId ? ({
                    ...v, userServices: v.userServices.map(
                        s => s.id === action.payload.id ? ({ ...s, "userId": action.payload.userId }) : s
                    )
                }) : v
            ) : []
            return { ...state, loading: false, orders: updated_standart_orders_d }
        case 'ORDER_SERVICE_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        //UPDATE AND COMPLETE ORDER(status=true) and add packing service
        case 'ORDERS_COMPLETE_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'ORDERS_COMPLETE_UPDATE_SUCCESS':
            const orders_data_c = [...state.orders]
            const updated_orders_c_data = orders_data_c.map(x => x.id === action.payload.id ? action.payload : x)
            return { ...state, loading: false, orders: updated_orders_c_data }
        case 'ORDERS_COMPLETE_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'ORDERS_DEFECTIVE_UPDATE_AND_INSERT_NEW_REQUEST':
            return {...state, loading: true}
        case 'ORDERS_DEFECTIVE_UPDATE_AND_INSERT_NEW_SUCCESS':
            return {...state, loading: false}
        case 'ORDERS_DEFECTIVE_UPDATE_AND_INSERT_NEW_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}