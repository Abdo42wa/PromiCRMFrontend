import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
//import { userLoginReducer, userRegisterReducer, userDataReducer } from './Reducers/userReducer';
import { usersReducer } from './reducers/userReducer';
import { usersListReducer } from './reducers/userListReducer';
import { productMaterialsReducer } from './reducers/productMaterialsReducer';
import { productsReducer } from './reducers/productsReducer';
import { shipmentsReducer } from './reducers/shipmentsReducer';
import { customersReducer } from './reducers/customersReducer';
import { warehouseReducer } from './reducers/warehouseReducer';
import { nonStandartWorksReducer } from './reducers/nonStandartWorksReducer';
import { countryReducer } from './reducers/countryReducer'
import { orderReducer } from './reducers/orderReducer'
import { bonusesReducer } from './reducers/bonusesReducer';
import { currencyReducer } from './reducers/currencyReducer'
import { servicesReducer } from './reducers/servicesReducer'
import { weeklyWorkScheduleReducer } from './reducers/WeeklyWorkScheduleReducer'
import { userTypesReducer } from './reducers/userTypesReducer'
import { salesChannelsReducer } from './reducers/salesChannelsReducer'
import { materialsWarehouseReducer } from './reducers/materialsWarehouseReducer';
import { recentWorksReducer } from './reducers/recentWorksReducer';
import { orderDetailsReducer } from './reducers/orderDetailsReducer';
import { reportsReducer } from './reducers/reportsReducer';
import Cookies from 'js-cookie';

const allReducers = combineReducers({
    usersReducer,
    usersListReducer,
    productMaterialsReducer,
    productsReducer,
    shipmentsReducer,
    customersReducer,
    warehouseReducer,
    nonStandartWorksReducer,
    countryReducer,
    orderReducer,
    bonusesReducer,
    currencyReducer,
    servicesReducer,
    weeklyWorkScheduleReducer,
    userTypesReducer,
    salesChannelsReducer,
    materialsWarehouseReducer,
    recentWorksReducer,
    orderDetailsReducer,
    reportsReducer
});


const userInfoFromStorage = Cookies.get('currentUser') ? Cookies.get('currentUser') : null;
const initialState = {
    usersReducer: { currentUser: userInfoFromStorage },
}

const middleware = [thunk];

const store = createStore(allReducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;