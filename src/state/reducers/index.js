import { combineReducers } from 'redux';
import authReducer from './auth';
import mealsReducer from './meals';

export default combineReducers({ auth: authReducer, meals: mealsReducer });
