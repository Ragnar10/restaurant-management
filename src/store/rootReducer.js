import {combineReducers} from 'redux';
import tablesReducer from './reducers/tables/reducer';
import waitersReducer from "./reducers/waiters/reducer";
import dishesReducer from "./reducers/dishes/reducer";
import checksReducer from "./reducers/checks/reducer";

export const rootReducer = combineReducers({
    tablesReducer,
    waitersReducer,
    dishesReducer,
    checksReducer
});