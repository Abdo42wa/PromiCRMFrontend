
export const reportsReducer = (state = {
    last_month_sold_products: [],
    last_month_sold_products_qty: 0,
    completed_platforms_orders_by_time: [],
    completed_platforms_orders_by_time_qty: 0
}, action) => {
    switch (action.type) {
        case 'REPORTS_LAST_MONTH_SOLD_PRODUCTS_REQUEST':
            return { ...state, loading: true }
        case 'REPORTS_LAST_MONTH_SOLD_PRODUCTS_SUCCESS':
            let l_m_s_products = [...action.payload]
            //accumulator is just value. we will each loop add currentValue to it.
            //and i need to initialize accumulator as zero, so second argument will be zero
            let sum_qty = l_m_s_products.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.quantity
            }, 0)
            return { ...state, loading: false, last_month_sold_products: action.payload, last_month_sold_products_qty: sum_qty }
        case 'REPORTS_LAST_MONTH_SOLD_PRODUCTS_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'REPORTS_PLATFORMS_ORDERS_BY_TIME_REQUEST':
            return { ...state, loading: true }
        case 'REPORTS_PLATFORMS_ORDERS_BY_TIME_SUCCESS':
            let order_by_platforms_time = [...action.payload]
            console.log(JSON.stringify(order_by_platforms_time))
            //accumulator is just value. we will each loop add currentValue to it.
            //and i need to initialize accumulator as zero, so second argument will be zero
            let sum_platforms_orders = order_by_platforms_time.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.quantity
            }, 0)
            return { ...state, loading: false, completed_platforms_orders_by_time: action.payload, completed_platforms_orders_by_time_qty: sum_platforms_orders }
        case 'REPORTS_PLATFORMS_ORDERS_BY_TIME_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'REPORTS_PLATFORMS_ORDERS_BY_TIME_REFRESH':
            return { ...state, loading: false, completed_platforms_orders_by_time: [] }


        case 'REPORTS_COUNTRY_ORDERS_BY_TIME_SUCCESS':
            let order_by_Country_time = [...action.payload]
            console.log(JSON.stringify(order_by_Country_time))
            //accumulator is just value. we will each loop add currentValue to it.
            //and i need to initialize accumulator as zero, so second argument will be zero
            let sum_Country_orders = order_by_Country_time.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.quantity
            }, 0)
            return { ...state, loading: false, completed_Country_orders_by_time: action.payload, completed_Country_orders_by_time_qty: sum_Country_orders }
        case 'REPORTS_COUNTRY_ORDERS_BY_TIME_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'REPORTS_COUNTRY_ORDERS_BY_TIME_REFRESH':
            return { ...state, loading: false, completed_Country_orders_by_time: [] }
        default:
            return state;
    }
}