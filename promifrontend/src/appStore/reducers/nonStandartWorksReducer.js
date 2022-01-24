export const nonStandartWorksReducer = (state = { nonStandartWorks: [] }, action) => {
    switch (action.type) {
        case 'NON_STANDART_WORKS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'NON_STANDART_WORKS_FETCH_SUCCESS':
            return { ...state, loading: false, nonStandartWorks: action.payload }
        case 'NON_STANDART_WORKS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'NON_STANDART_WORKS_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'NON_STANDART_WORKS_CREATE_SUCCESS':
            // add new object to nonStandartWorks array(state)
            const newArray = [...state.nonStandartWorks, { ...action.payload }]
            return { ...state, loading: false, nonStandartWorks: newArray }
        case 'NON_STANDART_WORKS_CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'NON_STANDART_WORKS_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'NON_STANDART_WORKS_UPDATE_SUCCESS':
            const worksClone = JSON.parse(JSON.stringify(state.nonStandartWorks));
            worksClone.map((element, index) => {
                if (element.id === action.payload.id) {
                    element.orderNumber = action.payload.orderNumber;
                    element.date = action.payload.date;
                    element.orderDeadline = action.payload.orderDeadline;
                    element.daysUntilDeadline = action.payload.daysUntilDeadline;
                    element.customerId = action.payload.customerId;
                    element.device = action.payload.device;
                    element.plannedProductionTime = action.payload.plannedProductionTime;
                    element.comment = action.payload.comment;
                    element.materialId = action.payload.materialId;
                    element.status = action.payload.status;
                }
            })
            return { ...state, loading: false, nonStandartWorks: worksClone }
        case 'NON_STANDART_WORKS_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}