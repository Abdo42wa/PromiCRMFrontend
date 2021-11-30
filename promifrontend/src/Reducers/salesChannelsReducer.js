export const salesChannelsReducer = (state = {salesChannels: []},action)=>{
    switch(action.type){
        case 'SALES_CHANNELS_FETCH_REQUEST':
            return {...state, loading: true}
        case 'SALES_CHANNELS_FETCH_SUCCESS':
            return {...state, loading: false, salesChannels: action.payload}
        case 'SALES_CHANNELS_FETCH_FAIL':
            return {...state,loading:false,error: action.payload}
        case 'SALES_CHANNELS_CREATE_REQUEST':
            return {...state,loading:true}
        case 'SALES_CHANNELS_CREATE_SUCCESS':
            // adding new obj to salesChannels array(state)
            const newSalesChannels = [...state.salesChannels, {...action.payload}]
            return {...state, loading: false, salesChannels: newSalesChannels}
        case 'SALES_CHANNELS_CREATE_FAIL':
            return {...state,loading:false,error:action.payload}
        case 'SALES_CHANNELS_UPDATE_REQUEST':
            return {...state, loading: true }
        case 'SALES_CHANNELS_UPDATE_SUCCESS':
            const salesChannelsClone = JSON.parse(JSON.stringify(state.salesChannels));
            salesChannelsClone.map((element,index)=>{
                if(element.id === action.payload.id){
                    element.title = action.payload.title;
                    element.contactPerson = action.payload.contactPerson;
                    element.email = action.payload.email;
                    element.phoneNumber = action.payload.phoneNumber;
                    element.deliveryAddress = action.payload.deliveryAddress;
                    element.discount = action.payload.discount;
                    element.brokerageFee = action.payload.brokerageFee;
                    element.userId = action.payload.userId;
                }
            });
            return {...state, loading: false, salesChannels: salesChannelsClone}
        case 'SALES_CHANNELS_UPDATE_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}