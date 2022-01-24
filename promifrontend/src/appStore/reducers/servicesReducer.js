export const servicesReducer = (state = { services: [] }, action) => {
    switch (action.type) {
        case 'SERVICES_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'SERVICES_FETCH_SUCCESS':
            return { ...state, loading: false, services: action.payload }
        case 'SERVICES_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}