import {types} from '../../types/dishes/types';

const {SET_DISHES_ACTION, SAVE_DISH_ACTION, DELETE_DISH_ACTION, SEARCH_DISH_ACTION, SET_LOADING_ACTION} = types;

const initialState = {
    list: [],
    search: '',
    loading: true
};

const dishesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_ACTION:
            return {
                ...state,
                loading: action.payload
            };
        case SET_DISHES_ACTION:
            return {
                ...state,
                list: action.payload
            };
        case SAVE_DISH_ACTION:
            return  state.list.find(item => item.id === action.payload.id) === undefined ?
                {...state, list: [...state.list, action.payload]}
                : {...state, list: state.list.map(item => item.id === action.payload.id ? action.payload : item)};
        case DELETE_DISH_ACTION:
            return {
                ...state,
                list: state.list.filter(item => item.id !== action.payload.id)
            };
        case SEARCH_DISH_ACTION:
            return {
                ...state,
                search: action.payload
            };
        default:
            return state;
    }
};

export default dishesReducer;