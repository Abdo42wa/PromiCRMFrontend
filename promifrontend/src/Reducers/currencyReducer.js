export const currencyReducer = (state = { currency: [] }, action) => {
    switch (action.type) {
        case 'CURRENCY_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'CURRENCY_FETCH_SUCCESS':
            return { ...state, loading: false, currency: action.payload }
        case 'CURRENCY_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}