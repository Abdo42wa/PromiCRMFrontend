// export const userLoginReducer = (state = {}, action) => {
//     switch (action.type) {
//         case 'USER_LOGIN_REQUEST':
//             return { loading: true }
//         case 'USER_LOGIN_SUCCESS':
//             return { loadind: false, userInfo: action.payload }
//         case 'USER_LOGIN_FAIL':
//             return { loading: false, error: action.payload }
//         case 'USER_LOGOUT':
//             return {}
//         default:
//             return state
//     }
// }

// export const userRegisterReducer = (state = {}, action) => {

//     switch (action.type) {
//         case 'USER_REGISTER_REQUEST':
//             return { loading: true }
//         case 'USER_REGISTER_SUCCESS':
//             return { loadind: false, userInfo: action.payload }
//         case 'USER_REGISTER_FAIL':
//             return { loading: false, error: action.payload }
//         default:
//             return state
//     }
// }
// export const userDataReducer = (state = {}, action) => {

//     switch (action.type) {
//         case 'USER_DATA_REQUEST':
//             return { loading: true }
//         case 'USER_DATA_SUCCESS':
//             return { loadind: false, userInfo: action.payload }
//         case 'USER_DATA_FAIL':
//             return { loading: false, error: action.payload }
//         default:
//             return state
//     }
// }

export const usersReducer = (state = { currentUser: null, user: null }, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return { loading: true }
        case 'USER_LOGIN_SUCCESS':
            return { ...state, loading: false, currentUser: action.payload.token }
        case 'USER_LOGIN_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_LOGOUT':
            return { ...state, currentUser: null, user: null }
        case 'USER_REGISTER_REQUEST':
            return { loading: true };
        case 'USER_REGISTER_SUCCESS':
            return { ...state, loading: false };
        case 'USER_REGISTER_FAIL':
            return { loading: false, error: action.payload };
        case 'USER_DATA_REQUEST':
            return { ...state, loading: true };
        case 'USER_DATA_SUCCESS':
            return { ...state, loading: false, user: action.payload };
        case 'USER_DATA_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}