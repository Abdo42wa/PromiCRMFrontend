export const customersReducer = (state = {customers: []},action)=>{
    switch(action.type){
        case 'CUSTOMERS_FETCH_REQUEST':
            return {...state, loading: true}
        case 'CUSTOMERS_FETCH_SUCCESS':
            return {...state, loading: false, customers: action.payload}
        case 'CUSTOMERS_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'CUSTOMERS_CREATE_REQUEST':
            return {...state, loading: true}
        case 'CUSTOMERS_CREATE_SUCCESS':
            //add new object to customers array(state)
            const newCustomers = [...state.customers, {...action.payload}]
        case 'CUSTOMERS_CREATE_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'CUSTOMERS_UPDATE_REQUEST':
            return {...state, loading: true}
        case 'CUSTOMERS_UPDATE_SUCCESS':
            // loop through array check for item with same id, then update its values to new
            const customersClone = JSON.parse(JSON.stringify(state.customers));
            customersClone.map((element,index)=>{
                if(customersClone.id === action.payload.id){
                    element.name = action.payload.name;
                    element.lastName = action.payload.lastName;
                    element.email = action.payload.email;
                    element.phoneNumber = action.payload.phoneNumber;
                    element.companyName = action.payload.companyName;
                }
            });
            return {...state, loading: false, customers: customersClone}
        case 'CUSTOMERS_UPDATE_FAIL':
            return {...state, loading: false, error: action.payload}
        default: 
            return state;
    }
}