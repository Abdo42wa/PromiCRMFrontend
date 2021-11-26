export const weeklyWorkScheduleReducer = (state = { workSchedules: [] }, action) => {
    switch (action.type) {
        case 'WORKSCHEDULE_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'WORKSCHEDULE_FETCH_SUCCESS':
            return { ...state, loading: false, workSchedules: action.payload }
        case 'WORKSCHEDULE_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
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
            const workSchedulesClone = JSON.parse(JSON.stringify(state.workSchedules));
            workSchedulesClone.map((element, index) => {
                if (element.id === action.payload.id) {
                    element.userId = action.payload.userId;
                    element.darbasApibūdinimas = action.payload.darbasApibūdinimas;
                    element.atlikta = action.payload.atlikta;
                }
            });
            return { ...state, loading: false, workSchedules: workSchedulesClone }
        case 'WORKSCHEDULE_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}