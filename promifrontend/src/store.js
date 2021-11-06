import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from './Reducers/userReducer';

const allReducers = combineReducers({
    userLogin: userLoginReducer
});


const userInfoFromStorage = localStorage.getItem('userInfo');
const initialState = {
    userLogin: { currentUser: userInfoFromStorage }
}

const middleware = [thunk];

const store = createStore(allReducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;