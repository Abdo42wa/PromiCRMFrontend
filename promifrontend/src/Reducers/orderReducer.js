export const orderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case 'ORDER_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload }
        case 'ORDER_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'ORDER_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_CREATE_SUCCESS':

            const newOrder = [...state.orders, { ...action.payload }]
            return { ...state, loading: false, orders: newOrder }
        case 'ORDER_CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'ORDER_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'ORDER_UPDATE_SUCCESS':
            const cloneOrder = JSON.parse(JSON.stringify(state.orders));
            cloneOrder.map((element, index) => {
                if (element.id === action.payload.id) {
                    element.orderType = action.payload.orderType;
                    element.status = action.payload.status;
                    element.orderNumber = action.payload.orderNumber;
                    element.date = action.payload.date;
                    element.platforma = action.payload.platforma;
                    element.moreInfo = action.payload.moreInfo;
                    element.quantity = action.payload.quantity;
                    element.photo = action.payload.photo;
                    element.productCode = action.payload.productCode;
                    element.shipmentTypeId = action.payload.shipmentTypeId;
                    element.customerId = action.payload.customerId;
                    element.device = action.payload.device;
                    element.productionTime = action.payload.productionTime;
                    element.address = action.payload.address;
                    element.countryId = action.payload.countryId;
                    element.comment = action.payload.comment;
                    element.price = action.payload.price;
                    element.currencyId = action.payload.currencyId;
                    element.vat = action.payload.vat;
                    element.orderFinishDate = action.payload.orderFinishDate;
                }
            })
            return { ...state, loading: false, orders: cloneOrder }
        case 'ORDER_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}