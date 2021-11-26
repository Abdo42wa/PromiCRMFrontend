export const userTypesReducer = (state = {userTypes: []},action) =>{
    switch(action.type){
        case 'USER_TYPES_FETCH_REQUEST':
            return {...state,loading: true}
        case 'USER_TYPES_FETCH_SUCCESS':
            return {...state,loading: false, userTypes: action.payload}
        case 'USER_TYPES_FETCH_FAIL':
            return {...state, loading:false, error: action.payload}
        default:
            return state;
    }
}