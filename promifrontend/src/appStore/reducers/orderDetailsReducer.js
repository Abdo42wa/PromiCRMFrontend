export const orderDetailsReducer = (state = {
    // main dashboard
    main_pending_products: null,
    main_necessary_today: null,
    main_today_made_products: null,
    main_new_today_orders: null,
    // end main dashboard
    uncompleted_orders_times: [],
    completed_warehouse_orders: [],
    uncompleted_express_orders: [],
    uncompleted_warehouse_orders: [],
    uncompleted_orders: [],
    clients_orders: [],
    last_weeks_orders: [],
    last_month_orders: [],
    urgent_orders: [],
    recent_orders: [],
    employees_made_products: [],
    uncompleted_orders_by_platforms: []
}, action) => {
    switch (action.type) {
        //first main dashboard -------
        case 'MAIN_PENDING_PRODUCTS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'MAIN_PENDING_PRODUCTS_FETCH_SUCCESS':
            return { ...state, loading: false, main_pending_products: action.payload }
        case 'MAIN_PENDING_PRODUCTS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'MAIN_NECESSARY_TODAY_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'MAIN_NECESSARY_TODAY_FETCH_SUCCESS':
            return { ...state, loading: false, main_necessary_today: action.payload }
        case 'MAIN_NECESSARY_TODAY_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'MAIN_TODAY_MADE_PRODUCTS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'MAIN_TODAY_MADE_PRODUCTS_FETCH_SUCCESS':
            return { ...state, loading: false, main_today_made_products: action.payload }
        case 'MAIN_TODAY_MADE_PRODUCTS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'MAIN_TODAY_NEW_PRODUCTS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'MAIN_TODAY_NEW_PRODUCTS_FETCH_SUCCESS':
            return { ...state, loading: false, main_new_today_orders: action.payload }
        case 'MAIN_TODAY_NEW_PRODUCTS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        // ----------- END first main dashboard
        case 'ORDERS_UNCOMPLETED_TIMES_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'ORDERS_UNCOMPLETED_TIMES_FETCH_SUCCESS':
            const uncompleted_orders_times_c = [...action.payload]
            const updated_orders_times = uncompleted_orders_times_c ? uncompleted_orders_times_c.reduce((previousValue, currentValue) => {
                return {
                    laserTime: previousValue.laserTime + currentValue.laserTime,
                    milingTime: previousValue.milingTime + currentValue.milingTime,
                    paintingTime: previousValue.paintingTime + currentValue.paintingTime,
                    grindingTime: previousValue.grindingTime + currentValue.grindingTime,
                    bondingTime: previousValue.bondingTime + currentValue.bondingTime,
                    collectionTime: previousValue.collectionTime + currentValue.collectionTime,
                    packingTime: previousValue.packingTime + currentValue.packingTime,
                    doneLaserTime: previousValue.doneLaserTime + currentValue.doneLaserTime,
                    doneMilingTime: previousValue.doneMilingTime + currentValue.doneMilingTime,
                    donePaintingTime: previousValue.donePaintingTime + currentValue.donePaintingTime,
                    doneGrindingTime: previousValue.doneGrindingTime + currentValue.doneGrindingTime,
                    doneBondingTime: previousValue.doneBondingTime + currentValue.doneBondingTime,
                    doneCollectionTime: previousValue.doneCollectionTime + currentValue.doneCollectionTime,
                    donePackingTime: previousValue.donePackingTime + currentValue.donePackingTime,
                }
            }) : []
            const _u_array = [
                updated_orders_times
            ]
            return { ...state, loading: false, uncompleted_orders_times: _u_array }
        case 'ORDERS_UNCOMPLETED_TIMES_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        // start unsende oredrs
        case 'ORDERS_UNSENDED_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'ORDERS_UNSENDED_FETCH_SUCCESS':
            return { ...state, loading: false, unsended_orders: action.payload }
        case 'ORDERS_UNSENDED_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        // end unsended orders
        // start unsende oredrs
        case 'ORDERS_RECOMMENDED_FOR_PRODUCTION_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'ORDERS_RECOMMENDED_FOR_PRODUCTION_FETCH_SUCCESS':
            return { ...state, loading: false, production_orders: action.payload }
        case 'ORDERS_RECOMMENDED_FOR_PRODUCTION_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        // end unsended orders
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
            return { ...state, loading: true }
        case 'ORDERS_RECENT_FETCH_SUCCESS':
            return { ...state, loading: false, recent_orders: action.payload }
        case 'ORDERS_RECENT_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'EMPLOYEE_ORDERS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'EMPLOYEE_ORDERS_FETCH_SUCCESS':
            return { ...state, loading: false, employees_made_products: action.payload }
        case 'EMPLOYEE_ORDERS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'UNCOMPLETED_ORDERS_BY_PLATFORMS_FETCH_REQUEST':
            return {...state, loading: true}
        case 'UNCOMPLETED_ORDERS_BY_PLATFORMS_FETCH_SUCCESS':
            return {...state, loading: false,uncompleted_orders_by_platforms: action.payload }
        case 'UNCOMPLETED_ORDERS_BY_PLATFORMS_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}