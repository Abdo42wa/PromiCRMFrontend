export const bonusesReducer = (state = { bonuses: [], month_made_products: null, users_month_operations: [], users_month_bonuses:[] }, action) => {
    switch (action.type) {
        case 'BONUSES_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'BONUSES_FETCH_SUCCESS':
            return { ...state, loading: false, bonuses: action.payload }
        case 'BONUSES_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'BONUSES_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'BONUSES_CREATE_SUCCESS':
            // add new object to bonuses state array
            const newBonuses = [...state.bonuses, { ...action.payload }]
            return { ...state, loading: false, bonuses: newBonuses }
        case 'BONUSES_CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'BONUSES_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'BONUSES_UPDATE_SUCCESS':
            const bonuses_clone = [...state.bonuses]
            const updated_bonuses = bonuses_clone.map(x => x.id === action.payload.id ? action.payload : x)
            return { ...state, loading: false, bonuses: updated_bonuses }
        case 'BONUSES_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'BONUSES_MONTH_MADE_PRODUCTS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'BONUSES_MONTH_MADE_PRODUCTS_FETCH_SUCCESS':
            let month_made_products = [...action.payload]
            if (month_made_products[0] === null || month_made_products[0] === undefined)
                return { ...state, loading: false, month_made_products: 0 }
            else
                return { ...state, loading: false, month_made_products: month_made_products[0] }
        case 'BONUSES_MONTH_MADE_PRODUCTS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'BONUSES_USERS_MONTH_OPERATIONS_FETCH_REQUEST':
            return {...state, loading: true}
        case 'BONUSES_USERS_MONTH_OPERATIONS_FETCH_SUCCESS':
            return {...state, loading: false, users_month_operations: action.payload}
        case 'BONUSES_USERS_MONTH_OPERATIONS_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
            // users_month_bonuses
        case 'USERS_MONTH_BONUSES_FETCH_REQUEST':
            return {...state, loading: true}
        case 'USERS_MONTH_BONUSES_FETCH_SUCCESS':
            return {...state, loading: false,users_month_bonuses: action.payload }
        case 'USERS_MONTH_BONUSES_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}