export const customersReducer = (state = { customers: [] }, action) => {
    switch (action.type) {
        case 'CUSTOMERS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'CUSTOMERS_FETCH_SUCCESS':
            return { ...state, loading: false, customers: action.payload }
        case 'CUSTOMERS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'CUSTOMERS_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'CUSTOMERS_CREATE_SUCCESS':
            //add new object to customers array(state)
            const newCustomers = [...state.customers, { ...action.payload }]
            return { ...state, loading: false, customers: newCustomers }
        case 'CUSTOMERS_CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'CUSTOMER_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'CUSTOMER_UPDATE_SUCCESS':
            // loop through array check for item with same id, then update its values to new
            const customers_clone = [...state.customers]
            const updated_customers = customers_clone.map(x => x.id === action.payload.id ? action.payload : x)
            return { ...state, loading: false, customers: updated_customers }
        case 'CUSTOMER_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}