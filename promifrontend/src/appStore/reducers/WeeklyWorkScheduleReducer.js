export const weeklyWorkScheduleReducer = (state = { workSchedules: [] }, action) => {
    switch (action.type) {
        case 'WORKSCHEDULE_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'WORKSCHEDULE_FETCH_SUCCESS':
            return { ...state, loading: false, workSchedules: action.payload }
        case 'WORKSCHEDULE_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'WEEK_WORK_SCHEDULES_FETCH_REQUEST':
            return {...state, loading: true}
        case 'WEEK_WORK_SCHEDULES_FETCH_SUCCESS':
            return {...state, loading: false, workSchedules:action.payload}
        case 'WEEK_WORK_SCHEDULES_FETCH_FAIL':
            return {...state, loading: false, error:action.payload}
        case 'WORKSCHEDULE_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'WORKSCHEDULE_CREATE_SUCCESS':
            const newworkSchedules = [...state.workSchedules, { ...action.payload }]
            return { ...state, loading: false, workSchedules: newworkSchedules }
        case 'WORKSCHEDULE_CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'WORKSCHEDULE_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'WORKSCHEDULE_UPDATE_SUCCESS':
            const workSchedulesClone = [...state.workSchedules]
            const updated = workSchedulesClone.map(x => x.id === action.payload.id?action.payload:x)
            return { ...state, loading: false, workSchedules: updated }
        case 'WORKSCHEDULE_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}