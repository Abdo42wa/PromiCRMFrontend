
export const usersReducer = (state = { currentUser: null, user: null, userInfo: null }, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return { loading: true }
        case 'USER_LOGIN_SUCCESS':
            return { ...state, loading: false, currentUser: action.payload.token }
        case 'USER_LOGIN_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_LOGOUT':
            return { ...state, currentUser: null, user: null }
        case 'USER_DATA_REQUEST':
            return { ...state, loading: true };
        case 'USER_DATA_SUCCESS':
            return { ...state, loading: false, user: action.payload };
        case 'USER_DATA_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'GET_LOGGED_USER_SUCCESS':
            return {...state, loading: false, userInfo: action.payload}
        case 'GET_LOGGED_USER_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}