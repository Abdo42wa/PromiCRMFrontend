export const bonusReducer = (state = { bonuses: [] }, action) => {
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
            const bonusesClone = JSON.parse(JSON.stringify(state.bonuses));
            bonusesClone.map((element, index) => {
                if (element.id === action.payload.id) {
                    element.userId = action.payload.userId;
                    element.quantity = action.payload.quantity;
                    element.accumulated = action.payload.accumulated;
                    element.bonusas = action.payload.bonusas;
                    element.leftUntil = action.payload.leftUntil;
                }
            })
            return { ...state, loading: false, bonuses: bonusesClone }
        case 'BONUSES_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}