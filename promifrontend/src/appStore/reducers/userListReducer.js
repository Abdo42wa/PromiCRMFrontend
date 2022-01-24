export const usersListReducer = (state = {users: []}, action) => {
    switch(action.type){
        case 'FETCH_ALL_REQUEST':
            return {...state, loading: true}
        case 'FETCH_ALL_SUCCESS':
            return {...state, loading: false, users: action.payload}
        case 'FETCH_ALL_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'USER_REGISTER_REQUEST':
            return {...state, loading: true}
        case 'USER_REGISTER_SUCCESS':
            const new_users = [...state.users,{...action.payload}]
            return {...state, loading: false, users: new_users}
        case 'USER_REGISTER_FAIL':
            return {...state, loading:false, error: action.payload}
        default: 
            return state;
    }
}