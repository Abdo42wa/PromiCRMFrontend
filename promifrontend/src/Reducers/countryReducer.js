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
            const countriesClone = JSON.parse(JSON.stringify(state.countries));
            countriesClone.map((element, index) => {
                if (element.id === action.payload.id) {
                    element.name = action.payload.name;
                    element.shortName = action.payload.shortName;
                    element.continent = action.payload.continent;
                    element.countyId = action.payload.countyId;
                }
            })
            return { ...state, loading: false, countries: countriesClone }
        case 'COUNTRY_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

