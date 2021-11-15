export const countryReducer = (state = { countries: [] }, action) => {
    switch (action.type) {
        case 'COUNTRY_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'COUNTRY_FETCH_SUCCESS':
            return { ...state, loading: false, countries: action.payload }
        case 'COUNTRY_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}