export const countryReducer = (state = { countries: [] }, action) => {
    switch (action.type) {
        case 'COUNTRY_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'COUNTRY_FETCH_SUCCESS':
            return { ...state, loading: false, countries: action.payload }
        case 'COUNTRY_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'COUNTRY_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'COUNTRY_CREATE_SUCCESS':
            const newCountry = [...state.countries, { ...action.payload }]
            return { ...state, loading: false, countries: newCountry }
        case 'COUNTRY_CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'COUNTRY_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'COUNTRY_UPDATE_SUCCESS':
            const countries_clone = [...state.countries]
            const updated_countries = countries_clone.map(x => x.id === action.payload.id?action.payload:x)
            return { ...state, loading: false, countries: updated_countries }
        case 'COUNTRY_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

