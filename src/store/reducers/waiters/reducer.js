import {types} from '../../types/waiters/types';

const {SET_WAITERS_ACTION, SAVE_WAITER_ACTION, DELETE_WAITER_ACTION, SEARCH_WAITER_ACTION, SET_LOADING_ACTION} = types;

const initialState = {
    list: [],
    search: '',
    loading: true
};

const waitersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_ACTION:
            return {
                ...state,
                loading: action.payload
            };
        case SET_WAITERS_ACTION:
            return {
                ...state,
                list: action.payload
            };
        case SAVE_WAITER_ACTION:
            return  state.list.find(item => item.id === action.payload.id) === undefined ?
                {...state, list: [...state.list, action.payload]}
                : {...state, list: state.list.map(item => item.id === action.payload.id ? action.payload : item)};
        case DELETE_WAITER_ACTION:
            return {
                ...state,
                list: state.list.filter(item => item.id !== action.payload.id)
            };
        case SEARCH_WAITER_ACTION:
            return {
                ...state,
                search: action.payload
            };
        default:
            return state;
    }
};

export default waitersReducer;