export const bonusesReducer = (state = { bonuses: [] }, action) => {
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
            const updated_bonuses = bonuses_clone.map(x => x.id === action.payload.id?action.payload:x)
            return { ...state, loading: false, bonuses: updated_bonuses }
        case 'BONUSES_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}