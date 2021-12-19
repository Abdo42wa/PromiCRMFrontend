export const recentWorksReducer = (state= {recent_works: []},action)=>{
    switch(action.type){
        case 'RECENT_WORKS_FETCH_REQUEST':
            return {...state,loading: true}
        case 'RECENT_WORKS_FETCH_SUCCESS':
            const recent_works = action.payload;
            return {...state, loading: false, "recent_works": recent_works}
        case 'RECENT_WORKS_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'RECENT_WORKS_CREATE_REQUEST':
            return {...state, loading: true}
        case 'RECENT_WORKS_CREATE_SUCCESS':
            //add new obj to recentWorks array. save what is already in there
            const _recent_works = [...state.recent_works, {...action.payload}]
            return {...state, loading: false, "recent_works":_recent_works}
        case 'RECENT_WORKS_CREATE_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'RECENT_WORKS_UPDATE_REQUEST':
            return {...state, loading: true}
        case 'RECENT_WORKS_UPDATE_SUCCESS':
            //map through recentWorks array, if record id is same as action payload id replace that obj with action.payload else leave same obj as was
            const recent_works_ = state.recent_works.map(x => x.id === action.payload.id? action.payload: x)
            return {...state, loading: false, "recent_works":recent_works_}
        case 'RECENT_WORKS_UPDATE_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'RECENT_WORKS_DELETE_REQUEST':
            return {...state, loading: true}
        case 'RECENT_WORKS_DELETE_SUCCESS':
            // Returns the elements of an array that meet the condition specified
            const recent_works_clone = state.recent_works.filter(x => x.id !== action.payload.id)
            return {...state, loading: false, "recent_works":recent_works_clone}
        case 'RECENT_WORKS_DELETE_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}