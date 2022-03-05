
export const reportsReducer = (state = {
    last_month_sold_products: [],
    last_month_sold_products_qty: 0,
    completed_platforms_orders_by_time: []
}, action) => {
    switch (action.type) {
        case 'REPORTS_LAST_MONTH_SOLD_PRODUCTS_REQUEST':
            return {...state, loading: true}
        case 'REPORTS_LAST_MONTH_SOLD_PRODUCTS_SUCCESS':
            let l_m_s_products = [...action.payload]
            //accumulator is just value. we will each loop add currentValue to it.
            //and i need to initialize accumulator as zero, so second argument will be zero
            let sumQty = l_m_s_products.reduce((accumulator, currentValue)=>{
                return accumulator + currentValue.quantity
            }, 0)
            console.log(sumQty)
            return {...state, loading: false, last_month_sold_products: action.payload, last_month_sold_products_qty: sumQty }
        case 'REPORTS_LAST_MONTH_SOLD_PRODUCTS_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'REPORTS_PLATFORMS_ORDERS_BY_TIME_REQUEST':
            return {...state, loading: true}
        case 'REPORTS_PLATFORMS_ORDERS_BY_TIME_SUCCESS':
            return {...state, loading: false, completed_platforms_orders_by_time: action.payload }
        case 'REPORTS_PLATFORMS_ORDERS_BY_TIME_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}