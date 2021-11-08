import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
//import { userLoginReducer, userRegisterReducer, userDataReducer } from './Reducers/userReducer';
import { usersReducer } from './Reducers/userReducer'


const allReducers = combineReducers({
    usersReducer
});


const userInfoFromStorage = localStorage.getItem('userInfo');
const initialState = {
    userLogin: { currentUser: userInfoFromStorage }
}

const middleware = [thunk];

const store = createStore(allReducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;