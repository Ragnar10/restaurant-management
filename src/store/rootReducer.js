import {combineReducers} from 'redux';
import tablesReducer from './reducers/tables/reducer';
import waitersReducer from "./reducers/waiters/reducer";

export const rootReducer = combineReducers({
    tablesReducer,
    waitersReducer
});